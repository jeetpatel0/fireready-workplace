export type Course = { id: string; title: string; description: string; duration: string; lessons: number; level: string; tag: string; tone: string; outcomes: string[]; region: string; instructor: string; reviewed: string; format: string; audience: string[] }
export const courses: Course[] = [
  {id:'readiness', title:'Wildfire Readiness Essentials', description:'Make a plan, prepare your space, and know what to do when conditions change.', duration:'35 min', lessons:4, level:'Beginner', tag:'Start here', tone:'sage', region:'Canada-wide', instructor:'Preparedness team', reviewed:'June 2025', format:'Self-paced', audience:['Households','Everyone'], outcomes:['Understand wildfire risk in Canada','Create a simple household action plan','Prepare the 1.5 metre zone around your home','Know where to find local alerts']},
  {id:'prevention', title:'Preventing Wildfires', description:'Learn how everyday choices can reduce human-caused wildfire risk.', duration:'25 min', lessons:3, level:'All levels', tag:'Prevention', tone:'clay', region:'Canada-wide', instructor:'FireSmart educators', reviewed:'May 2025', format:'Self-paced', audience:['Outdoor enthusiasts','Everyone'], outcomes:['Use campfires safely','Recognize high-risk activities','Share prevention practices with others']},
  {id:'community', title:'Community Preparedness', description:'Help your neighbourhood plan together, communicate clearly, and recover stronger.', duration:'45 min', lessons:5, level:'Intermediate', tag:'Together', tone:'blue', region:'Canada-wide', instructor:'Community resilience team', reviewed:'April 2025', format:'Facilitated + self-paced', audience:['Community leaders','Volunteers'], outcomes:['Start a community preparedness conversation','Support neighbours with access needs','Coordinate trusted information']},
  {id:'smoke', title:'Smoke & Air Quality', description:'Practical steps to protect your health before and during smoky days.', duration:'20 min', lessons:3, level:'All levels', tag:'Health', tone:'mauve', region:'Canada-wide', instructor:'Public health educators', reviewed:'July 2025', format:'Self-paced', audience:['Households','Caregivers'], outcomes:['Read the Air Quality Health Index','Create a cleaner-air room','Know when to seek medical advice']},
  {id:'evacuation', title:'Evacuation Decisions', description:'Build a calm, clear departure plan for alerts, orders, and changing routes.', duration:'30 min', lessons:4, level:'Beginner', tag:'In an emergency', tone:'clay', region:'Western Canada', instructor:'Emergency management advisors', reviewed:'June 2025', format:'Scenario practice', audience:['Households','Travellers'], outcomes:['Tell an alert from an order','Pack and leave safely','Plan alternate routes']},
  {id:'home', title:'FireSmart Your Home', description:'Prioritize low-cost actions that make your home and yard more resilient.', duration:'40 min', lessons:5, level:'Intermediate', tag:'At home', tone:'sage', region:'Canada-wide', instructor:'FireSmart practitioners', reviewed:'March 2025', format:'Self-paced', audience:['Homeowners','Renters'], outcomes:['Assess ignition zones','Choose safer materials','Create a seasonal maintenance list']},
  {id:'workplace', title:'Workplace Continuity', description:'Help teams communicate, protect staff, and keep essential services moving.', duration:'35 min', lessons:4, level:'Intermediate', tag:'For teams', tone:'blue', region:'Canada-wide', instructor:'Business continuity team', reviewed:'February 2025', format:'Workshop', audience:['Employers','Managers'], outcomes:['Assign emergency roles','Plan remote operations','Support staff after evacuation']},
  {id:'youth', title:'Young People & Wildfire', description:'A welcoming introduction to wildfire safety for classrooms, camps, and families.', duration:'15 min', lessons:3, level:'Beginner', tag:'For youth', tone:'mauve', region:'Canada-wide', instructor:'Learning designers', reviewed:'May 2025', format:'Interactive', audience:['Educators','Youth'], outcomes:['Spot unsafe fire behaviour','Make a simple go-kit','Share trusted information']},
  {id:'recovery', title:'After the Fire', description:'Understand the first steps for returning, supporting one another, and rebuilding.', duration:'30 min', lessons:4, level:'All levels', tag:'Recovery', tone:'clay', region:'Canada-wide', instructor:'Recovery partners', reviewed:'January 2025', format:'Self-paced', audience:['Households','Community leaders'], outcomes:['Return only when authorized','Document needs safely','Find support services']},
  {id:'facilitator', title:'Facilitator Foundations', description:'A practical guide for delivering inclusive wildfire preparedness conversations.', duration:'50 min', lessons:6, level:'Advanced', tag:'Train others', tone:'blue', region:'Canada-wide', instructor:'Training faculty', reviewed:'June 2025', format:'Facilitated', audience:['Trainers','Community leaders'], outcomes:['Use the learning kit','Adapt activities respectfully','Evaluate a session']}
]
export const lessons = [
  {title:'Know your risk', body:'Wildfire is a natural part of many Canadian ecosystems, but changing conditions can make fires spread quickly. Start by learning the risks around your home, workplace, and usual travel routes. Local fire bans and alerts are your best source for what is happening today.'},
  {title:'Prepare your space', body:'A few metres around your home can make a meaningful difference. Clear dry leaves and needles, keep gutters clean, and move flammable items away from walls and decks. Think of this as creating a small buffer that gives firefighters more options.'},
  {title:'Make your plan', body:'Write down how you will receive alerts, where you will go, and who you will check in with. Include pets, medications, mobility needs, and a paper copy of key phone numbers. Practise your route so it feels familiar.'},
  {title:'Act early', body:'If an evacuation alert is issued, be ready to leave. If an evacuation order is issued, leave immediately using the route directed by authorities. Do not wait for visible smoke or flames. Bring your go-kit and check on neighbours if it is safe.'}
]
export const quiz = [
  {question:'Which source should guide your actions during an active wildfire?', options:['A social media post','Local emergency authorities','A neighbour’s guess'], answer:1},
  {question:'What is a useful first step around your home?', options:['Clear dry leaves from gutters','Add more patio furniture','Store firewood beside the door'], answer:0},
  {question:'What should an evacuation order prompt you to do?', options:['Wait for visible flames','Leave immediately as directed','Drive around to look'], answer:1}
]
export const resources = [
  {type:'Checklist', title:'Household go-kit', description:'A printable list of essentials to grab quickly, including needs for children, pets, and medications.'},
  {type:'Worksheet', title:'Make your wildfire plan', description:'A one-page template for contacts, routes, meeting places, and accessibility needs.'},
  {type:'Guide', title:'Safer campfires', description:'Simple prevention reminders for before, during, and after enjoying a fire outdoors.'},
  {type:'Link collection', title:'Find local alerts', description:'A starting point for provincial and territorial emergency information and air quality updates.'}
]

export const audiences = [
  ['Households','Make a go-kit, plan for pets, and practise two ways out.'],
  ['Renters','Talk with a landlord and focus on portable, low-cost actions.'],
  ['Homeowners','Prioritize ignition zones and seasonal maintenance.'],
  ['Community leaders','Bring neighbours together and share trusted updates.'],
  ['Educators','Use age-appropriate activities and accessible language.'],
  ['Employers','Plan continuity, staff check-ins, and flexible operations.'],
  ['Outdoor visitors','Prevent ignitions and understand local restrictions.'],
  ['Caregivers','Include medications, mobility, sensory, and communication needs.'],
  ['Youth','Build confidence through simple, practical choices.']
] as const

export const trainingMethods = [
  ['Self-paced modules','Short lessons, knowledge checks, and downloadable actions for flexible schedules.'],
  ['Scenario practice','Branching examples that let learners rehearse decisions without real-world risk.'],
  ['Facilitated circles','Guided conversations where local knowledge and lived experience shape the plan.'],
  ['360° exploration','Visual hotspots make home and neighbourhood choices memorable.'],
  ['Take-home tools','Checklists and templates turn learning into a plan people can revisit.']
] as const

export const learningPrinciples = [
  ['01','Start with action','Every lesson ends with a small step learners can take safely.'],
  ['02','Layer the detail','Plain-language essentials come first, with optional depth for practitioners.'],
  ['03','Respect local context','Examples point learners back to provincial, territorial, and municipal guidance.'],
  ['04','Design for access','Keyboard support, readable contrast, captions, transcripts, and printable options are part of the plan.'],
  ['05','Make it measurable','Outcomes, practice, and feedback align so teams can improve over time.'],
  ['06','Keep it current','Review dates and owners are visible on every course.']
] as const

export const evaluationMetrics = [
  ['Completion','78%','Learners who finish a selected course'],
  ['Confidence','4.2 / 5','Post-course self-rating'],
  ['Action intent','86%','Learners who chose a next step'],
  ['Review cadence','Quarterly','Content owner check-in']
] as const

export const challengeRows = [
  ['Reaching diverse learners','Offer low-bandwidth pages, transcripts, printable tools, and facilitated options.','Resources: accessibility checklist + audience profiles.'],
  ['Keeping guidance current','Assign an owner, show review dates, and link to local authorities.','Resources: content register + quarterly review.'],
  ['Limited time or budget','Start with high-risk tasks, reuse modular content, and pilot with one group.','Budgeting: people · content · facilitation · evaluation.'],
  ['Misinformation and anxiety','Use calm language, cite trusted sources, and practise decisions before fire season.','Resources: source guide + scenario cards.']
] as const

export const legalContent = {
  privacy: 'Collect only what is needed to provide learning services, explain why it is collected, and offer a way to ask questions. Do not collect sensitive emergency or health information in course forms.',
  cookies: 'Essential browser storage may remember local prototype preferences. Add a consent experience before using analytics or non-essential cookies.',
  retention: 'Define retention periods, deletion requests, access controls, and a responsible owner. Keep evaluation data aggregated where possible.'
}
