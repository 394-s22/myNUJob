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
            # job_details = self.parse_clean_job(job_details)
            # self.parse_populate_job(job_details, job_dict[job_title])

            # yield {'jobs':job_dict}
            yield {'jobs':job_details, 'url': response.url}
            # yield {'len': len(job_details), 'url': response.url, 'jobs':job_details}


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
            if elem.isupper():
                job_dict[elem] = job_details[idx+1]
            # if (idx%2 == 0) and (idx != len(job_details)):
            #     job_dict[elem] = job_details[idx+1]

