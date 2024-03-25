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

        ## Everyday Sustainability section
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

        ## Renewable Energy section
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

        # Efficent Ways to Conserve Energy at Home
        question_conserve_at_home_1 = Question.objects.create(
            topic_id=2,
            question="Which appliance consumes the most energy when not in use but plugged in?",
            option1="Microwave",
            option2="Television",
            option3="Charger",
            answer=0,
            explanation="Microwaves consume more energy when not in use but plugged in compared to many other household appliances due to their standby mode.",
            article_link="https://www.energy.gov/articles/4-ways-save-energy-and-money-your-home"
        )

        question_conserve_at_home_2 = Question.objects.create(
            topic_id=2,
            question="What is the most effective way to reduce heating costs in the winter?",
            option1="Increasing the thermostat setting",
            option2="Installing thermal curtains",
            option3="Leaving windows open",
            answer=1,
            explanation="Installing thermal curtains can significantly reduce heat loss, helping to keep the home warmer without increasing the thermostat setting.",
            article_link="https://www.energy.gov/energysaver/energy-efficient-window-treatments"
        )

        question_conserve_at_home_3 = Question.objects.create(
            topic_id=2,
            question="LED bulbs are known for:",
            option1="Higher energy consumption",
            option2="Being less durable",
            option3="Using less energy and lasting longer",
            answer=2,
            explanation="LED bulbs use less energy and have a longer lifespan compared to traditional incandescent bulbs, making them a more energy-efficient option.",
            article_link="https://www.energy.gov/energysaver/led-lighting"
        )

        question_conserve_at_home_4 = Question.objects.create(
            topic_id=2,
            question="To save energy, it is recommended to set your refrigerator temperature to:",
            option1="0°F for the freezer, 40°F for the fridge",
            option2="32°F for the freezer, 50°F for the fridge",
            option3="10°F for the freezer, 38°F for the fridge",
            answer=0,
            explanation="Setting your freezer to 0°F and your refrigerator to 40°F is recommended for food safety while also being energy efficient.",
            article_link="https://www.energy.gov/energysaver/appliances-and-electronics/refrigerators-and-freezers"
        )

        question_conserve_at_home_5 = Question.objects.create(
            topic_id=2,
            question="What is a simple method to reduce water heating costs?",
            option1="Use more hot water",
            option2="Lower the water heater temperature",
            option3="Increase the water heater temperature",
            answer=1,
            explanation="Lowering the water heater temperature can significantly reduce water heating costs without impacting comfort.",
            article_link="https://www.energy.gov/energysaver/water-heating/reduce-hot-water-use-energy-savings"
        )

        question_conserve_at_home_6 = Question.objects.create(
            topic_id=2,
            question="Which of the following practices is least effective in conserving energy at home?",
            option1="Unplugging unused appliances",
            option2="Using appliances during off-peak hours",
            option3="Leaving lights on when not in a room",
            answer=2,
            explanation="Leaving lights on when not in a room is the least effective practice for conserving energy, as it leads to unnecessary energy consumption.",
            article_link="https://www.energy.gov/energysaver/lighting-choices-save-you-money"
        )


        ## Wildlife section
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

        # Questions for Canada Conservation quiz

        question_canada_conservation_1 = Question.objects.create(
            topic_id=3,
            question="What is Canada's largest terrestrial mammal, known for its significant role in Indigenous cultures and conservation efforts?",
            option1="Moose",
            option2="Wood Bison",
            option3="Grizzly Bear",
            answer=1,
            explanation="The Wood Bison is Canada's largest land mammal and has been the focus of significant conservation efforts due to its cultural importance and threatened status.",
            article_link="https://www.pc.gc.ca/en/pn-np/nt/woodbuffalo/nature/conservation/bison"
        )

        question_canada_conservation_2 = Question.objects.create(
            topic_id=3,
            question="Which Canadian bird, known for its unique mating dance, is considered a conservation success story?",
            option1="Whooping Crane",
            option2="Peregrine Falcon",
            option3="Sage Grouse",
            answer=0,
            explanation="The Whooping Crane was once on the brink of extinction, but conservation efforts in Canada have helped its population to recover.",
            article_link="https://www.hww.ca/en/wildlife/birds/whooping-crane.html"
        )

        question_canada_conservation_3 = Question.objects.create(
            topic_id=3,
            question="What initiative is crucial for protecting Canada's marine life, including species like the North Atlantic Right Whale?",
            option1="Urban development",
            option2="Marine Protected Areas",
            option3="Forestry",
            answer=1,
            explanation="Marine Protected Areas (MPAs) are a crucial initiative for conserving Canada's marine ecosystems and protecting endangered species.",
            article_link="https://www.dfo-mpo.gc.ca/oceans/mpa-zpm/index-eng.html"
        )

        question_canada_conservation_4 = Question.objects.create(
            topic_id=3,
            question="Which iconic Canadian species is known for its engineering impact on ecosystems, yet faced population decline due to fur trade?",
            option1="Canadian Lynx",
            option2="Beaver",
            option3="Polar Bear",
            answer=1,
            explanation="The Beaver, known for its dam-building, played a significant role in Canada's history but faced decline due to the fur trade.",
            article_link="https://www.canadiangeographic.ca/article/animal-facts-beaver"
        )

        question_canada_conservation_5 = Question.objects.create(
            topic_id=3,
            question="What is a leading cause of decline for many of Canada's species at risk, including the Caribou?",
            option1="Habitat destruction",
            option2="Climate change",
            option3="Pollution",
            answer=0,
            explanation="Habitat destruction, including from development and industry, is a leading cause of decline for species like the Caribou.",
            article_link="https://www.naturecanada.ca/discover-nature/endangered-species/caribou/"
        )

        question_canada_conservation_6 = Question.objects.create(
            topic_id=3,
            question="Canada is home to the only place where which marine creature can be found in freshwater?",
            option1="Narwhal",
            option2="Beluga Whale",
            option3="Sea Otter",
            answer=1,
            explanation="The Beluga Whale can be found in the freshwater of the St. Lawrence River, unique for a marine mammal.",
            article_link="https://www.wwf.ca/species/belugas/"
        )

        # Questions for Forest Conservation quiz
        question_conservation_forests_1 = Question.objects.create(
            topic_id=3,  
            question="What is the term for the practice of planting trees in an area where the forest has been depleted?",
            option1="Deforestation",
            option2="Afforestation",
            option3="Reforestation",
            answer=2,
            explanation="Reforestation is the process of planting trees in areas where the forest has been removed or destroyed.",
            article_link="https://www.nationalforests.org/blog/tree-planting-programs-reforestation"
        )

        question_conservation_forests_2 = Question.objects.create(
            topic_id=3,
            question="Which of the following is NOT a direct benefit of conserving forests?",
            option1="Increased carbon sequestration",
            option2="Enhanced soil erosion",
            option3="Biodiversity preservation",
            answer=1,
            explanation="Enhanced soil erosion is not a benefit of conserving forests; in fact, forests help prevent soil erosion.",
            article_link="https://www.fao.org/forestry/sustainable-management/en/"
        )

        question_conservation_forests_3 = Question.objects.create(
            topic_id=3,
            question="Sustainable forest management aims to:",
            option1="Maximize short-term profits from timber sales",
            option2="Ensure forests can fulfill ecological, social, and economic functions over the long term",
            option3="Limit access to forest resources to conservationists only",
            answer=1,
            explanation="Sustainable forest management ensures that forest resources can fulfill their ecological, social, and economic roles sustainably over the long term.",
            article_link="https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/sustainable-forest-management"
        )

        question_conservation_forests_4 = Question.objects.create(
            topic_id=3,
            question="What role do forests play in the water cycle?",
            option1="Forests increase water pollution",
            option2="Forests have no impact on the water cycle",
            option3="Forests regulate water flow and quality",
            answer=2,
            explanation="Forests play a crucial role in regulating the water cycle, including water flow and quality, through processes like transpiration and filtration.",
            article_link="https://www.usgs.gov/special-topics/water-science-school/science/forests-and-water-cycle"
        )

        question_conservation_forests_5 = Question.objects.create(
            topic_id=3,
            question="Which international effort is focused on reducing emissions from deforestation and forest degradation?",
            option1="Greenpeace",
            option2="REDD+",
            option3="The Paris Agreement",
            answer=1,
            explanation="REDD+ is an international effort aimed at reducing emissions from deforestation and forest degradation.",
            article_link="https://www.un-redd.org/"
        )

        question_conservation_forests_6 = Question.objects.create(
            topic_id=3,
            question="The concept of 'urban forests' includes:",
            option1="Only natural woodlands within city boundaries",
            option2="All trees and plants within urban areas",
            option3="Forests located on the outskirts of cities",
            answer=1,
            explanation="Urban forests include all trees and plants within urban areas, contributing to biodiversity, air quality, and well-being in cities.",
            article_link="https://www.nature.org/en-us/what-we-do/our-insights/perspectives/urban-forests/"
        )

        # Questions for Ocean and Marine Life Conservation quiz
        question_marine_life_1 = Question.objects.create(
            topic_id=3,
            question="Why is conserving ocean biodiversity crucial?",
            option1="Increases tourism",
            option2="Supports marine life and human livelihoods",
            option3="Simplifies navigation",
            answer=1,
            explanation="Conserving ocean biodiversity is vital as it supports marine life diversity, which in turn, supports human livelihoods through fishing, tourism, and maintaining the balance of marine ecosystems.",
            article_link="https://www.conservation.org/priorities/oceans"
        )

        question_marine_life_2 = Question.objects.create(
            topic_id=3,
            question="What is a significant source of ocean pollution?",
            option1="Solar radiation",
            option2="Plastic waste",
            option3="Seaweed overgrowth",
            answer=1,
            explanation="Plastic waste is a significant source of ocean pollution, harming marine life and ecosystems.",
            article_link="https://oceanconservancy.org/trash-free-seas/"
        )

        question_marine_life_3 = Question.objects.create(
            topic_id=3,
            question="How can coral reefs be protected?",
            option1="By increasing ocean temperatures",
            option2="Through sustainable fishing practices",
            option3="By using more sunscreen",
            answer=1,
            explanation="Sustainable fishing practices help protect coral reefs by reducing overfishing and destructive fishing methods that can damage coral structures.",
            article_link="https://www.worldwildlife.org/initiatives/coral-reefs"
        )

        question_marine_life_4 = Question.objects.create(
            topic_id=3,
            question="What is the purpose of Marine Protected Areas (MPAs)?",
            option1="To increase commercial fishing",
            option2="To restrict public access to beaches",
            option3="To conserve marine life and habitats",
            answer=2,
            explanation="MPAs are designated to conserve marine life and habitats, helping to protect ecosystems and biodiversity.",
            article_link="https://marine-conservation.org/what-we-do/advocate/mpas/"
        )

        question_marine_life_5 = Question.objects.create(
            topic_id=3,
            question="What does 'sustainable seafood' mean?",
            option1="Seafood that is affordable",
            option2="Seafood caught or farmed in ways that consider the long-term vitality of harvested species",
            option3="Seafood available in large quantities",
            answer=1,
            explanation="Sustainable seafood is caught or farmed in environmentally friendly ways that protect fish populations and ecosystems.",
            article_link="https://www.fishwatch.gov/sustainable-seafood/faqs"
        )

        question_marine_life_6 = Question.objects.create(
            topic_id=3,
            question="What impact does ocean acidification have on marine life?",
            option1="Improves coral growth",
            option2="Has no significant impact",
            option3="Harms shell-forming species",
            answer=2,
            explanation="Ocean acidification, primarily caused by increased carbon dioxide absorption from the atmosphere, harms shell-forming species and coral reefs.",
            article_link="https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification"
        )


        ## Sustainable Farming section
        # Questions for Sustainable Farming quiz

        question_sustainable_farming_1 = Question.objects.create(
            topic_id=4,
            question="What practice reduces the need for chemical fertilizers in sustainable farming?",
            option1="Monoculture",
            option2="Crop rotation",
            option3="Overgrazing",
            answer=1,
            explanation="Crop rotation improves soil fertility and helps break cycles of pests and diseases, reducing the need for chemical fertilizers.",
            article_link="https://www.sare.org/publications/crop-rotation-on-organic-farms/"
        )

        question_sustainable_farming_2 = Question.objects.create(
            topic_id=4,
            question="Which sustainable farming method involves growing plants in a water-based nutrient-rich solution?",
            option1="Aquaponics",
            option2="Hydroponics",
            option3="Terracing",
            answer=1,
            explanation="Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in a water solvent.",
            article_link="https://www.nal.usda.gov/afsic/hydroponics"
        )

        question_sustainable_farming_3 = Question.objects.create(
            topic_id=4,
            question="What is the term for the integration of crops and livestock in sustainable agriculture?",
            option1="Agroforestry",
            option2="Polyculture",
            option3="Integrated farm management",
            answer=2,
            explanation="Polyculture involves growing multiple crop species in the same space to increase biodiversity and reduce dependence on synthetic inputs.",
            article_link="https://www.agroforestry.co.uk/about-agroforestry/"
        )

        question_sustainable_farming_4 = Question.objects.create(
            topic_id=4,
            question="Which of the following is a benefit of using cover crops in sustainable farming?",
            option1="Increasing pesticide efficiency",
            option2="Enhancing soil moisture",
            option3="Reducing crop yield",
            answer=1,
            explanation="Cover crops help in enhancing soil moisture, preventing erosion, and improving soil health, among other benefits.",
            article_link="https://www.sare.org/Learning-Center/Topic-Rooms/Cover-Crops"
        )

        question_sustainable_farming_5 = Question.objects.create(
            topic_id=4,
            question="Sustainable farming practices aim to accomplish what key objective?",
            option1="Maximize crop yield only",
            option2="Increase chemical use efficiency",
            option3="Maintain environmental health",
            answer=2,
            explanation="The primary objective of sustainable farming is to maintain environmental health while providing food and fiber.",
            article_link="https://www.nal.usda.gov/afsic/sustainable-agriculture-definitions-and-terms"
        )

        question_sustainable_farming_6 = Question.objects.create(
            topic_id=4,
            question="Which technique minimizes soil erosion in sustainable farming?",
            option1="Contour plowing",
            option2="Deep plowing",
            option3="Annual tilling",
            answer=0,
            explanation="Contour plowing, which involves plowing along the contours of the land, helps in minimizing soil erosion.",
            article_link="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/null/?cid=nrcs143_023569"
        )


        # Creating Quizzes
        quiz_sustainability_transport = Quiz.objects.create(topic_id=1, topic_title = "Everyday Sustainability", quiz_title="Recycle and Reuse", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258464/everyday_vrthfi.png", q1 =question_everyday_1, q2=question_everyday_2, q3=question_everyday_3, q4=question_everyday_4, q5=question_everyday_5, q6=question_everyday_6, order=1)
        quiz_types_renewable_energy = Quiz.objects.create(topic_id=2, topic_title="Renewable Energy", quiz_title="Types of Renewable Energy", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258468/renewable_yb4vzt.png", q1=question_renewable_type_1, q2=question_renewable_type_2, q3=question_renewable_type_3, q4=question_renewable_type_4, q5=question_renewable_type_5, q6=question_renewable_type_6, order=1)
        quiz_types_conserve_at_home = Quiz.objects.create(topic_id=2, topic_title="Renewable Energy", quiz_title="Conserve Energy at Home", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258468/renewable_yb4vzt.png", q1=question_conserve_at_home_1, q2=question_conserve_at_home_2, q3=question_conserve_at_home_3, q4=question_conserve_at_home_4, q5=question_conserve_at_home_5, q6=question_conserve_at_home_6, order=2)
        quiz_species_extinction = Quiz.objects.create(topic_id=3, topic_title = "Conservation Efforts", quiz_title="Species in Danger of Extinction", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258288/gpibju2c1hkpe4j7dtu9.png", q1 =question_extinction_1, q2=question_extinction_2, q3=question_extinction_3, q4=question_extinction_4, q5=question_extinction_5, q6=question_extinction_6, order=1)
        quiz_canada_conservation = Quiz.objects.create(topic_id=3, topic_title = "Conservation Efforts", quiz_title="Wildlife Conservation in Canada", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258288/gpibju2c1hkpe4j7dtu9.png", q1 =question_canada_conservation_1, q2=question_canada_conservation_2, q3=question_canada_conservation_3, q4=question_canada_conservation_4, q5=question_canada_conservation_5, q6=question_canada_conservation_6, order=2)
        quiz_forest_conservation = Quiz.objects.create(topic_id=3, topic_title = "Conservation Efforts", quiz_title="Protecting Our Forests", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258288/gpibju2c1hkpe4j7dtu9.png", q1 =question_conservation_forests_1, q2=question_conservation_forests_2, q3=question_conservation_forests_3, q4=question_conservation_forests_4, q5=question_conservation_forests_5, q6=question_conservation_forests_6, order=3)
        quiz_marine_life_conservation = Quiz.objects.create(topic_id=3, topic_title="Conservation Efforts", quiz_title="Ocean and Marine Life", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258288/gpibju2c1hkpe4j7dtu9.png", q1=question_marine_life_1, q2=question_marine_life_2, q3=question_marine_life_3, q4=question_marine_life_4, q5=question_marine_life_5, q6=question_marine_life_6, order=4)
        quiz_sustainable_farming = Quiz.objects.create(topic_id=4, topic_title = "Sustainable Agriculture", quiz_title="Sustainable Farming Practices", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711261315/farming2_mywm7s.png", q1 =question_sustainable_farming_1, q2=question_sustainable_farming_2, q3=question_sustainable_farming_3, q4=question_sustainable_farming_4, q5=question_sustainable_farming_5, q6=question_sustainable_farming_6, order=1)

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database.'))
