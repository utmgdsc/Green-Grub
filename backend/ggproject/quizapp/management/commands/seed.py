from django.core.management.base import BaseCommand
from quizapp.models import Quiz, Question

class Command(BaseCommand):
    help = 'Seeds the database with initial data.'

    def handle(self, *args, **options):
        
        # Delete all questions
        Question.objects.all().delete()

        # Delete all quizzes
        Quiz.objects.all().delete()

        # Creating questions

        # Questions for everyday tips
        question_everyday_1 = Question.objects.create(
            topic_id=1, 
            question="What everyday item can be reused to create a DIY plant watering system while you're away?",
            option1="Plastic bottles",
            option2="Coffee mugs",
            option3="Shoe boxes",
            answer=0,
            explanation="Plastic bottles can be pierced and filled with water to create a slow-drip system for plants.",
            article_link="https://www.epa.gov/recycle/reducing-and-reusing-basics"
        )

        question_everyday_2 = Question.objects.create(
            topic_id=1, 
            question="How can you reduce energy consumption while doing laundry?",
            option1="Use hot water only",
            option2="Fill the washer completely",
            option3="Wash clothes in cold water",
            answer=2,
            explanation="Washing clothes in cold water saves energy used to heat the water and is just as effective for most laundry.",
            article_link="https://www.energy.gov/energysaver/laundry"
        )

        question_everyday_3 = Question.objects.create(
            topic_id=1, 
            question="Which of these is an effective way to reduce paper waste?",
            option1="Printing on both sides",
            option2="Using larger fonts",
            option3="Emailing instead of mailing",
            answer=0,
            explanation="Printing on both sides of the paper can significantly reduce paper usage and waste.",
            article_link="https://www.epa.gov/recycle/reducing-waste-what-you-can-do"
        )

        question_everyday_4 = Question.objects.create(
            topic_id=1, 
            question="What is a fun way to repurpose old t-shirts?",
            option1="Use them as car wash rags",
            option2="Turn them into a quilt",
            option3="Both A and B",
            answer=2,
            explanation="Old t-shirts can be creatively repurposed for new uses, such as rags or a memorable quilt.",
            article_link="https://www.epa.gov/recycle/reducing-and-reusing-basics"
        )

        question_everyday_5 = Question.objects.create(
            topic_id=1, 
            question="How can you sustainably dispose of used cooking oil?",
            option1="Pour it down the sink",
            option2="Compost it",
            option3="Take it to a recycling center",
            answer=2,
            explanation="Recycling centers often accept used cooking oil, preventing plumbing issues and environmental harm.",
            article_link="https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables"
        )

        question_everyday_6 = Question.objects.create( 
            topic_id=1, 
            question="What's a sustainable practice for grocery shopping?",
            option1="Buying in bulk",
            option2="Choosing plastic bags over paper",
            option3="Shopping daily",
            answer=0,
            explanation="Buying in bulk reduces packaging waste and often saves money, making it a sustainable choice.",
            article_link="https://www.epa.gov/recycle/reducing-and-reusing-basics"
        )

        # Questions for Renewable Energy Types Quiz
        question_renewable_type_1 = Question.objects.create(
            topic_id=2, 
            question="Which renewable energy source is derived from the Earth's internal heat?",
            option1="Solar Power",
            option2="Geothermal Energy",
            option3="Hydropower",
            answer=1,
            explanation="Geothermal energy is derived from the heat stored within the Earth's interior.",
            article_link="https://www.nationalgeographic.org/encyclopedia/geothermal-energy/"
        )

        question_renewable_type_2 = Question.objects.create(
            topic_id=2, 
            question="What technology captures the sun's energy to generate electricity?",
            option1="Wind Turbines",
            option2="Solar Panels",
            option3="Hydroelectric Dams",
            answer=1,
            explanation="Solar panels, or photovoltaic cells, convert sunlight directly into electricity.",
            article_link="https://www.energy.gov/eere/solar/how-does-solar-work"
        )

        question_renewable_type_3 = Question.objects.create(
            topic_id=2, 
            question="Which type of renewable energy is produced by the flow of water?",
            option1="Wind Energy",
            option2="Solar Energy",
            option3="Hydropower",
            answer=2,
            explanation="Hydropower is generated by using the flow of water through turbines.",
            article_link="https://www.usgs.gov/faqs/how-much-electricity-does-an-american-home-use?qt-news_science_products=0#qt-news_science_products"
        )

        question_renewable_type_4 = Question.objects.create(
            topic_id=2, 
            question="What is the primary method of generating electricity from wind?",
            option1="Solar Panels",
            option2="Wind Turbines",
            option3="Water Mills",
            answer=1,
            explanation="Wind turbines convert the kinetic energy in wind into mechanical power and electricity.",
            article_link="https://www.energy.gov/eere/wind/how-do-wind-turbines-work"
        )

        question_renewable_type_5 = Question.objects.create(
            topic_id=2, 
            question="Which renewable resource is used in bioenergy production?",
            option1="Sunlight",
            option2="Water",
            option3="Organic Material",
            answer=2,
            explanation="Bioenergy is produced from organic materials, such as plant and animal waste.",
            article_link="https://www.nationalgeographic.org/encyclopedia/biofuel/"
        )

        question_renewable_type_6 = Question.objects.create(
            topic_id=2, 
            question="What advantage does tidal power have over solar power?",
            option1="Produces more energy",
            option2="Is more consistent",
            option3="Is cheaper to produce",
            answer=1,
            explanation="Tidal power is more consistent than solar power because tidal cycles are predictable and not affected by weather conditions like solar energy.",
            article_link="https://www.energy.gov/eere/water/types-hydropower-plants"
        )


        # Questions for Species in Extinction Quiz 
        question_extinction_1 = Question.objects.create(
            topic_id=3, 
            question="Which species is known as the 'ghost of the mountain'?",
            option1="Snow Leopard",
            option2="Bengal Tiger",
            option3="Giant Panda",
            answer=0,
            explanation="The Snow Leopard is often referred to as the 'ghost of the mountain' due to its elusive nature.",
            article_link="https://www.worldwildlife.org/species/snow-leopard"
        )

        question_extinction_2 = Question.objects.create( 
            topic_id=3, 
            question="What is the primary threat to the survival of the Orangutans?",
            option1="Climate Change",
            option2="Habitat Loss",
            option3="Overfishing",
            answer=1,
            explanation="Habitat Loss, largely due to deforestation for palm oil production, is the primary threat to Orangutans.",
            article_link="https://www.worldwildlife.org/species/orangutan"
        )

        question_extinction_3 = Question.objects.create( 
            topic_id=3, 
            question="Which marine species is critically endangered due to being hunted for its fin?",
            option1="Blue Whale",
            option2="Dolphin",
            option3="Shark",
            answer=2,
            explanation="Several shark species are critically endangered, primarily due to the demand for their fins.",
            article_link="https://www.worldwildlife.org/species/shark"
        )

        question_extinction_4 = Question.objects.create(
            topic_id=3, 
            question="What factor most threatens the survival of the Vaquita?",
            option1="Plastic Pollution",
            option2="Illegal Fishing Practices",
            option3="Global Warming",
            answer=1,
            explanation="Illegal fishing practices, specifically the use of gillnets, are the most significant threat to the Vaquita.",
            article_link="https://www.worldwildlife.org/species/vaquita"
        )

        question_extinction_5 = Question.objects.create(
            topic_id=3, 
            question="Which of these birds is known for its remarkable long-distance migratory patterns but is facing extinction?",
            option1="Peregrine Falcon",
            option2="Arctic Tern",
            option3="Albatross",
            answer=2,
            explanation="The Albatross is known for its long-distance flights across oceans but is threatened by factors like plastic pollution.",
            article_link="https://www.worldwildlife.org/species/albatross"
        )

        question_extinction_6 = Question.objects.create(
            topic_id=3, 
            question="The Javan Rhino is a critically endangered species found in which country?",
            option1="India",
            option2="Indonesia",
            option3="Vietnam",
            answer=1,
            explanation="The Javan Rhino is critically endangered, with the last population residing in Indonesia's Ujung Kulon National Park.",
            article_link="https://www.worldwildlife.org/species/javan-rhino"
        )


        question_1 = Question.objects.create( topic_id=1, question="How much was?", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_2 = Question.objects.create( topic_id=1, question="How much waste does a", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_3 = Question.objects.create( topic_id=1, question="How much w?", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_4 = Question.objects.create( topic_id=1, question="does a household produce in a day????", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_5 = Question.objects.create(topic_id=1, question="Howd produce in a day?????", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_6 = Question.objects.create( topic_id=1, question="How much w in a day??????", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        # Creating Quizzes
        quiz_sustainability_transport = Quiz.objects.create(topic_id=1, topic_title = "Everyday Sustainability", quiz_title="Recycle and Reuse", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258464/everyday_vrthfi.png", q1 =question_everyday_1, q2=question_everyday_2, q3=question_everyday_3, q4=question_everyday_4, q5=question_everyday_5, q6=question_everyday_6, order=1)
        quiz_types_renewable_energy = Quiz.objects.create(topic_id=2, topic_title="Renewable Energy", quiz_title="Types of Renewable Energy", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258468/renewable_yb4vzt.png", q1=question_renewable_type_1, q2=question_renewable_type_2, q3=question_renewable_type_3, q4=question_renewable_type_4, q5=question_renewable_type_5, q6=question_renewable_type_6, order=1)
        quiz_species_extinction = Quiz.objects.create(topic_id=3, topic_title = "Conservation Efforts", quiz_title="Species in Danger of Extinction", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258288/gpibju2c1hkpe4j7dtu9.png", q1 =question_extinction_1, q2=question_extinction_2, q3=question_extinction_3, q4=question_extinction_4, q5=question_extinction_5, q6=question_extinction_6, order=1)
        quiz_sustainability_transport = Quiz.objects.create(topic_id=4, topic_title = "Sustainable Agriculture", quiz_title="Sustainable Farming Practices", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711261315/farming2_mywm7s.png", q1 =question_1, q2=question_2, q3=question_3, q4=question_4, q5=question_5, q6=question_6, order=3)

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database.'))
