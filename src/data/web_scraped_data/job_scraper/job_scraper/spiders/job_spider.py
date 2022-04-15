import scrapy
import json

class JobSpiderSpider(scrapy.Spider):
    
    name = 'job_spider'
    allowed_domains = ['undergradaid.northwestern.edu']
    start_urls = ['https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/american-studies-newsletter-creation.html']
    
    # def __init__(self):
    #     self.jobs = None

    def parse(self, response):
        job_title = response.xpath('//div[@class="content"]//h1//text()').extract()[0]
        job_details = response.xpath('//div[@class="content"]//p//text()').extract()

        job_dict = {job_title: {}}

        job_details = self.parse_helper(job_details)
        self.parse_job_json(job_details, job_dict[job_title])

        return job_dict
    
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
            if (idx%2 == 0):
                job_dict[elem] = job_details[idx+1]


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


