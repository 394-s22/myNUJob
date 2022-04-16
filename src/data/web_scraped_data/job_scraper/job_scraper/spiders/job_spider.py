import scrapy
import json

from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class JobSpiderSpider(scrapy.Spider):
    
    name = 'job_spider'
    allowed_domains = ['undergradaid.northwestern.edu']
    start_urls = ['https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/']
    base_url = 'https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/'

    def parse(self, response):
        for link in response.xpath('//ul[@id="job-list"]//li//a'):
            yield response.follow(url=self.base_url + link.xpath('.//@href').get(), callback=self.parse_single_job)
        
    def parse_single_job(self, response):
        job_title = response.xpath('//div[@class="content"]//h1//text()').extract()[0]
        job_details = response.xpath('//div[@class="content"]//p//text()').extract()

        job_dict = {job_title: {}}
        job_details = self.parse_clean_job(job_details)
        self.parse_populate_job(job_details, job_dict[job_title])

        yield job_dict


    def parse_clean_job(self, job_details):
        job_details = [j for j in job_details if j != ': ' if j != ':' if j != '\u00a0']
        # for idx, job in enumerate(job_details):
        #     if ': ' in job:
        #         new_job = job[1:]
        #         job_details[idx] = new_job
        #     elif ':\xa0' in job:
        #         new_job = job[2:]
        #         job_details[idx] = new_job
        return job_details

    def parse_populate_job(self, job_details, job_dict):
        for idx, elem in enumerate(job_details):
            if elem.isupper():
                job_dict[elem] = job_details[idx+1]

        
    # TODO: Deeper cleaning
    # TODO: accumulate data overlapping in more than one sentence
     
