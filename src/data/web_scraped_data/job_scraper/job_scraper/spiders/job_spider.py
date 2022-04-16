import scrapy
import json

from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class JobSpiderSpider(scrapy.Spider):
    
    name = 'job_spider'
    allowed_domains = ['undergradaid.northwestern.edu']
    start_urls = ['https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/']
    base_url = 'https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/'

    # rules = [Rule(LinkExtractor(restrict_xpaths=('//ul[@id="job-list"]//li//a'), callback='parse', follow=True))]
    # rules = [Rule(LinkExtractor(restrict_xpaths=('//ul[@id="job-list"]//li//a'), process_value='parse'))]

    def parse(self, response):
        for link in response.xpath('//ul[@id="job-list"]//li//a'):
            yield response.follow(url=self.base_url + link.xpath('.//@href').get(), callback=self.parse_single_job)
        
    def parse_single_job(self, response):
        if not ('General Info' in response.url):
            job_title = response.xpath('//div[@class="content"]//h1//text()').extract()[0]
            job_details = response.xpath('//div[@class="content"]//p//text()').extract()

            job_dict = {job_title: {}}
            job_details = self.parse_clean_job(job_details)
            # self.parse_populate_job(job_details, job_dict[job_title])

            # yield {'jobs':job_dict}
            yield {'jobs':job_details}


    def parse_clean_job(self, job_details):
        job_details = [j for j in job_details if j != ': ' if j != ':' if j != '\xa0']

        for idx, job in enumerate(job_details):
            if ': ' in job:
                new_job = job[1:]
                job_details[idx] = new_job
            elif ':\xa0' in job:
                new_job = job[2:]
                job_details[idx] = new_job
        return job_details

    def parse_populate_job(self, job_details, job_dict):
        for idx, elem in enumerate(job_details):
            # even indices are the keys, odd indices are the pairs to the job description
            if (idx%2 == 0) and (idx != len(job_details)):
                job_dict[elem] = job_details[idx+1]




    # def parse(self, response):
    #     links_urls = []
    #     for link in response.xpath('//ul[@id="job-list"]//li//a'):
    #         links_urls.append(self.base_url + link.xpath('.//@href').get())
        
    #     return {'links' : links_urls}
        

# from scrapy.spiders import CrawlSpider
 
# class SuperSpider(CrawlSpider):
#     name = 'extractor'
#     allowed_domains = ['en.wikipedia.org']
#     start_urls = ['https://en.wikipedia.org/wiki/Python_(programming_language)']
#     base_url = 'https://en.wikipedia.org'
 
#     def parse(self, response):
#         for link in response.xpath('//div/p/a'):
#             yield {
#                 "link": self.base_url + link.xpath('.//@href').get()
            # }


    # start_urls = ['https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/american-studies-newsletter-creation.html']
    
    # def __init__(self):
    #     self.jobs = None

    # def parse(self, response):
    #     job_title = response.xpath('//div[@class="content"]//h1//text()').extract()[0]
    #     job_details = response.xpath('//div[@class="content"]//p//text()').extract()

    #     job_dict = {job_title: {}}

    #     job_details = self.parse_helper(job_details)
    #     self.parse_job_json(job_details, job_dict[job_title])

    #     return job_dict
    
    # def parse_clean_job(self, job_details):
    #     job_details = [j for j in job_details if j != ': ' if j != ':' if j != '\xa0']

    #     for idx, job in enumerate(job_details):
    #         if ': ' in job:
    #             new_job = job[1:]
    #             job_details[idx] = new_job
    #         elif ':\xa0' in job:
    #             new_job = job[2:]
    #             job_details[idx] = new_job
    #     return job_details

    # def parse_populate_job(self, job_details, job_dict):
    #     for idx, elem in enumerate(job_details):
    #         # even indices are the keys, odd indices are the pairs to the job description
    #         if (idx%2 == 0):
    #             job_dict[elem] = job_details[idx+1]


# output json object
# {'American Studies: Newsletter Creation': {'TERM AVAILABLE': ' Spring 2022', 
#                                         'NUMBER OF POSITIONS AVAILABLE': ' 1', 
#                                         'LOCATION': 'Northwestern - Evanston Campus', 
#                                         'WORK ARRANGEMENTS': ' Remote', 
#                                         'DEPARTMENT': 'American Studies', 
#                                         'JOB DESCRIPTION': 'To create a weekly newsletter for the students in the program to keep them informed about upcoming events and other things happening on campus that may be of interest.', 
#                                         'QUALIFICATIONS': 'Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)', 
#                                         'PAY RATE': ' $18.00/hr', 
#                                         'CONTACT NAME': 'Julie Lavin', 
#                                         'CONTACT PHONE NUMBER': '(847) 467-2262', 
#                                         'CONTACT EMAIL': 'julie.lavin@northwestern.edu'}}


# def parse(self, response):
#         links_urls = []
#         for link in response.xpath('//ul[@id="job-list"]//li//a'):
#             yield response.follow(url=self.base_url + link.xpath('.//@href').get(), callback=self.parse_single_job)
#             links_urls.append(self.base_url + link.xpath('.//@href').get())
        
#         response.follow(links_urls[0], callback=self.parse_single_job)

#         return {'links' : links_urls}

#     def parse_single_job(self, response):
#         print('LINKS FOUND')
#         print(response.url)
#         job_title = response.xpath('//div[@class="content"]//h1//text()').extract()[0]
#         job_details = response.xpath('//div[@class="content"]//p//text()').extract()
        
#         job_dict = {job_title: {}}

#         job_details = self.parse_clean_job(job_details)
#         self.parse_populate_job(job_details, job_dict[job_title])

#         print(job_dict)
#         return job_dict

#     def parse_clean_job(self, job_details):
#         job_details = [j for j in job_details if j != ': ' if j != ':' if j != '\xa0']

#         for idx, job in enumerate(job_details):
#             if ': ' in job:
#                 new_job = job[1:]
#                 job_details[idx] = new_job
#             elif ':\xa0' in job:
#                 new_job = job[2:]
#                 job_details[idx] = new_job
#         return job_details

#     def parse_populate_job(self, job_details, job_dict):
#         for idx, elem in enumerate(job_details):
#             # even indices are the keys, odd indices are the pairs to the job description
#             if (idx%2 == 0):
#                 job_dict[elem] = job_details[idx+1]






# import scrapy
# import logging

# class CountriesSpider(scrapy.Spider):
#     name = 'countries'
#     allowed_domains = ['www.worldometers.info']
#     start_urls = ['https://www.worldometers.info/world-population/population-by-country/']

#     def parse(self, response):
#         countries = response.xpath("//td/a")
#         for country in countries:
#             name = country.xpath(".//text()").get()
#             link = country.xpath(".//@href").get()

#             yield response.follow (url= link, callback=self.parse_country, meta={'country_name':name})
#     def parse_country(self, response):
#         name = response.request.meta['country_name']
#         rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
#         for row in rows:
#             year = row.xpath(".//td[1]/text()").get()
#             population = row.xpath(".//td[2]/strong/text()").get()
#             yield{
#                 'country_name' : name,
#                 'year' : year,
#                 'population' : population
#             }

#     def parse(self, response):
#         specialties = response.xpath("//h3")
#         for specialty in specialties:
#             name = specialty.xpath(".//text()").extract_first()
#             link = specialty.xpath(".//@href").extract_first()
#             yield response.follow(url=link, callback=self.parse_spacialty, meta={'specialty_name': name})
