import asyncio
from pprint import pprint
from playwright.async_api import async_playwright
import re
import json
import os

# include job title in job info
# placeholder data for jobs that need deeper scrapes

'''
key == id
value == job_dict_1 == dictionary storing info on the job
    "TITLE":
    "TERM AVAILABLE":
    "NUMBER OF POSITIONS AVAILABLE":
    "LOCATION":
    "WORK ARRANGEMENTS": 
    "DEPARTMENT": 
    "JOB DESCRIPTION": 
    "QUALIFICATIONS":
    "PAY RATE":
    "CONTACT NAME":
    "CONTACT PHONE NUMBER":
    "CONTACT EMAIL":
    "ID":
    "URL":
    "CATEGORY":
    
    job_dict['PAY RATE']
        == [float_1, float_2] == list of 2 floats to represent range of pay rate
        == [float_1] == list of 1 float to represent single pay rate value
'''


async def main():
    '''
    creates a "jobs_scrape.json" file with web-scraped info from NU on-campus jobs website
    '''
    with open("./src/data/jobs_scrape.json", "w") as outfile:
        json.dump(await scrape1(), outfile)


async def scrape1():
    '''
    scrapes the NU on-campus jobs website
    returns dictionary of list of dictionaries (containing info on a single job posting)
        - key == name of job
        - value == list of dictionaries where each dictionary holds info about the job
            (each value holds a list of dictionaries because
            some jobs may have the same name but different roles)
    '''
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto("https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/")
        links_locator = page.locator('#job-list li')
        # list of dictionaries holding k-v pairs of {key: text and value: link}
        # links_list = []
        jobs_dict = {}  # returned dictionary of jobs and their info

        links_count = await links_locator.count()
        # 34, 36 == range for Learning Sciences: Research Aide 2 posts
        # change the range to links_count to iterate through all locators
        for id in range(links_count):
            nth = links_locator.nth(id)
            # text = await nth.text_content()  # text of the link (used as key for k-v pairs)
            # url of the link (used as value for k-v pairs)
            category = await nth.get_attribute("class")
            link = await nth.locator('a').get_attribute("href")
            # links_list.append({"text": text, "link": page.url + link})
            sub_page = await context.new_page()
            await sub_page.goto(page.url + link)
            # await sub_page.wait_for_timeout(1000)
            job_title, job_info = await scrape2(sub_page, id_num=id)
            job_info['CATEGORY'] = category

            jobs_dict[id] = job_info

            # if id in jobs_dict.keys():
            #     jobs_dict[id] = jobs_dict[job_title] + [job_info]
            # else:
            #     jobs_dict[id] = [job_info]
        print("DONE!\n")
        await browser.close()

    return jobs_dict


async def scrape2(sub_page, id_num):
    '''
    - checks job posting links if they have all necessary info or need deeper scraping
        by scraping the page for "Job Description" text
        - if a job posting has all necessary info, returns a dictionary with that info
            (with 'ID' and 'URL' fields added)
        - else, returns a dictionary without info on the job posting
            (with only 'ID' and 'URL' fields added)

    returns tuple (job_title, dictionary)
    job_title == title of the job --> used as key for dictionary of jobs
    dictionary == dictionary storing info on the job with title job_title
    '''
    job_title_locator = sub_page.locator('#main-content .content h1')
    # used as key for returned dictionary
    job_title = await job_title_locator.inner_text()
    # job_title = job_title.replace('/', '&')
    job_title = re.sub('[\[\].$#/]', ' ', job_title)
    # job_title = re.sub(']|[', ' ', job_title)
    if await sub_page.locator('#main-content .content p:has-text("Job Description")').is_hidden():
        # if "Job Description" text is NOT on the page -> need to do deeper scrape following link in the page
        print("do deeper scrape for: ", job_title, '\n')
        job_info = {}  # returned dictionary
        # return (job_title, job_info)  # 'id' value is given by input id_num
    else:
        # if "Job Description" text is on the page -> all necessary info is on the page
        print("scraped this page:", job_title, '\n')
        job_info = await scrape3(sub_page)  # returned dictionary
    job_info['TITLE'] = job_title
    job_info['ID'] = id_num
    job_info['URL'] = sub_page.url
    return (job_title, job_info)  # 'id' value is given by input id_num


async def scrape3(sub_page):
    '''
    scrape job postings that are only a page deep from main NU on-campus job postings page

    returns dictionary of info on a single job posting by using dictify function
    '''
    # content_locator = sub_page.locator('#main-content .content')
    # print(await content_locator.inner_text())
    job_info = {}  # returned dictionary with info about a single job

    parsed_list = []
    content_locator = sub_page.locator('#main-content .content p')
    for i in range(await content_locator.count()):
        nth = content_locator.nth(i)
        text = await nth.inner_text()
        # print(i, " : ", text)
        # print(i, " : ", text, await parse(text))
        parsed_list.extend(await parse(text))
    # print(parsed_list)
    job_info = await dictify(parsed_list=parsed_list, dict=job_info)
    # print(type(job_info))
    # print(job_info)
    return job_info


async def parse(text):
    '''
    parses text input
    returns a list of parsed text
    '''
    text = text + ' '
    text = text.replace('\xa0', ' ')
    # splits text by ':' that is at the end of a word
    parsed_list = re.split(r": |\n\n", text)
    # parsed_list = re.split(r"[:\b]+", text) # splits text by ':' that is at the end of a word
    parsed_list = [i.strip() for i in parsed_list]
    return parsed_list


async def dictify(parsed_list, dict):
    '''
    iterates through list of parsed text and stores the list info in a dictionary
    where key is given by text in all uppercase, value is given by joins of text NOT in all uppercase

    returns dictionary storing all information on a single job
    '''
    curr_key = ''
    curr_val = ''
    for i in range(len(parsed_list)):
        if len(parsed_list[i]) == 0 or parsed_list[i] == '':
            continue
        elif parsed_list[i].isupper():
            if len(curr_key) != 0:
                dict[curr_key] = curr_val
                curr_val = ''
            curr_key = parsed_list[i]
        else:
            if parsed_list[i].startswith("$"):
                parsed_list[i] = re.sub('\$|/hr|[A-Z]|,', '', parsed_list[i])
                parsed_list[i] = list(
                    map(lambda x: float(x), parsed_list[i].split('-')))
                # for j in range(len(parsed_list[i])):
                #     parsed_list[i][j] = float(parsed_list[i][j])

            # has 13.00-17.00 issue

            if len(curr_val) == 0 or curr_val == '':
                curr_val = parsed_list[i]
            else:
                curr_val += '\n' + parsed_list[i]

        if i + 1 >= len(parsed_list) and not parsed_list[i].isupper():
            # if at the last element of parsed_list and the last element is not all uppercase (should be a key) --> scraping error
            dict[curr_key] = curr_val

    return dict


asyncio.run(main())
