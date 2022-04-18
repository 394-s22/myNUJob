import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import json


class JobSpiderSpider(scrapy.Spider):
    
    name = 'job_spider'
    allowed_domains = ['undergradaid.northwestern.edu']
    base_url = 'https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/'

    # identify all urls in the main page for on campus jobs
    def parse(self, response):
        for link in response.xpath('//ul[@id="job-list"]//li//a'):
            yield response.follow(url=self.base_url + link.xpath('.//@href').get(), callback=self.parse_single_job)
        
    # visit all jobs and parse info 
    def parse_single_job(self, response):
        job_title = response.xpath('//div[@class="content"]//h1//text()').extract()[0]
        job_details = response.xpath('//div[@class="content"]//p//text()').extract()

        job_dict = {job_title: {}}
        job_details = self.parse_clean_job(job_details)
        self.parse_populate_job(job_details, job_dict[job_title], response.url)

        yield job_dict

    # clean parse job data
    def parse_clean_job(self, job_details):
        job_details = [j for j in job_details if j != ': ' if j != ':' if j != '\u00a0']
        
        for idx, job in enumerate(job_details):
            job = job.replace("\u00a0", " ")
            job = job.replace(": ", '')
            job = job.replace(":", '')
            job = job.replace("\u2019", '\'')
            job_details[idx] = job

        return job_details

    # populate all jobs in a single dict
    def parse_populate_job(self, job_details, job_dict, url):
        key = ''
        for idx, elem in enumerate(job_details):
            if elem.isupper():
                key = elem
            else:
                if key in job_dict.keys():
                    if job_dict[key] == ' ':
                        job_dict[key] = job_dict[key] + elem
                    else:
                        job_dict[key] = job_dict[key] + ' ' + elem
                else:
                    job_dict[key] = elem

        job_dict["URL"] = url
        self.parse_wage_list(job_dict)

    # convert wages into a list
    def parse_wage_list(self, job_dict):
        for k, pay in job_dict.items():
            if k == "PAY RATE":
                pay = pay.replace('$', '')
                pay = pay.replace('/hr', '')
                pay = pay.replace(',', '')
                pay = pay.replace('-', ' ')
                pay = pay.replace(' DOE', '')
                pay_range = []
                for p in pay.split():
                    p = pay_range.append(float(p))
                job_dict[k] = pay_range  
