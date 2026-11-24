import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { ArrowRight, BarChart3, Check, ChevronRight, CircleCheck, Download, Flame, Menu, ShieldCheck, Target, Users, X } from 'lucide-react'
import './styles.css'

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

type Industry = {
  id: string
  title: string
  label: string
  description: string
  image: string
  photos: { src: string; alt: string; caption: string }[]
  hazards: string[]
  prevention: string[]
  emergency: string
}

const industries: Industry[] = [
  {
    id: 'high-rise',
    title: 'High-Rise Construction',
    label: 'Primary construction pathway',
    description: 'Detailed fire-safety training for changing multi-storey construction sites and temporary systems.',
    image: publicAsset('/images/highrise/site-workers.jpg'),
    photos: [
      { src: publicAsset('/images/highrise/site-workers.jpg'), alt: 'Construction workers coordinating around materials on an active site', caption: 'Crews coordinate around changing work areas.' },
      { src: publicAsset('/images/home/construction.jpg'), alt: 'A multi-storey construction site under development', caption: 'Conditions change as a building takes shape.' }
    ],
    hazards: ['Temporary and damaged electrical systems', 'Welding, cutting, grinding and other hot work', 'Flammable and combustible materials', 'Temporary heating equipment', 'Poor housekeeping and blocked evacuation routes'],
    prevention: ['Use designated material-storage areas and safety data sheets', 'Follow hot-work authorization, fire-watch and post-work monitoring requirements', 'Remove damaged equipment from service and report it', 'Inspect and operate temporary heating according to instructions and site requirements', 'Keep stairways, exits and emergency equipment accessible'],
    emergency: 'Raise the alarm using the site method, notify others, evacuate by designated stairs and routes, report to the assigned assembly area and wait for authorization before re-entry.'
  },
  {
    id: 'new-build',
    title: 'New-Build Construction',
    label: 'Construction pathway',
    description: 'Tailored awareness for framing, enclosure, finishing trades, temporary services and changing site access.',
    image: publicAsset('/images/new-build/framing.jpg'),
    photos: [
      { src: publicAsset('/images/new-build/framing.jpg'), alt: 'Timber framing at a new-build construction site', caption: 'Combustible materials and temporary services move with each stage.' },
      { src: publicAsset('/images/highrise/site-workers.jpg'), alt: 'Workers in safety gear on a construction site', caption: 'Shared routes and work areas need coordination between crews.' }
    ],
    hazards: ['Wood framing and combustible packaging', 'Temporary electrical installations', 'Hot work near framing or finishes', 'Paints, adhesives, solvents and flammable products', 'Temporary heaters and changing housekeeping needs'],
    prevention: ['Coordinate storage and waste removal across trades', 'Require inspections and authorization for temporary systems', 'Control hot work and protect adjacent combustibles', 'Follow product labels and safety data sheets', 'Reassess routes, accountability and fire protection as stages change'],
    emergency: 'Follow the project emergency plan; preserve egress, report hazards promptly and communicate across contractors and crews.'
  },
  {
    id: 'forestry',
    title: 'Forestry',
    label: 'Rural wildfire pathway',
    description: 'Wildfire weather, ignition control, smoke, remote communications and evacuation for forestry operations.',
    image: publicAsset('/images/forestry/forest.jpg'),
    photos: [
      { src: publicAsset('/images/forestry/forest-road.jpg'), alt: 'A forest access road through dense woodland', caption: 'Access and visibility matter in remote work areas.' },
      { src: publicAsset('/images/forestry/forest.jpg'), alt: 'Dense forest with changing light and visibility', caption: 'Forest fuels and conditions vary across the work area.' }
    ],
    hazards: ['Chainsaws and logging machinery', 'Heavy equipment friction and hot work', 'Dry vegetation and forest fuels', 'Wildfire weather and changing CFFDRS/FWI conditions', 'Smoke, PM2.5, remote routes and communication dead zones'],
    prevention: ['Check CFFDRS/FWI and work restrictions', 'Inspect spark-arrestors and control hot work', 'Use fire-watch arrangements and suppression cache checks', 'Use AQHI and work-rest controls; do not treat AQHI as an exposure limit', 'Plan two routes, satellite check-ins and vehicle staging'],
    emergency: 'Detect smoke or ignition early, stop safely, communicate, modify or suspend work, and follow the evacuation, shelter or re-entry plan directed for the site.'
  },
  {
    id: 'mining',
    title: 'Mining',
    label: 'Rural and industrial pathway',
    description: 'Surface and underground awareness for equipment, electrical, fuel, hot-work, dust and wildfire threats.',
    image: publicAsset('/images/mining/mine.jpg'),
    photos: [
      { src: publicAsset('/images/mining/maintenance-workshop.png'), alt: 'Mine workers and large equipment inside a maintenance workshop', caption: 'Equipment condition and workshop activity are part of hazard awareness.' },
      { src: publicAsset('/images/mining/fire-response-drill.png'), alt: 'Mine workers practicing a fire response near a site entrance', caption: 'Workers rehearse site-specific response actions.' }
    ],
    hazards: ['Overheating mobile equipment and heavy machinery', 'Electrical faults and damaged cables', 'Hydraulic fuel and oil systems', 'Hot work and conveyor systems', 'Combustible dust, underground smoke and wildfire exposure'],
    prevention: ['Inspect equipment before use and report overheating, leaks, smoke or burning smells', 'Control hot work through permits and site procedures', 'Keep fuel, hydraulics and combustibles controlled', 'Keep exits, refuge arrangements and fire equipment clear', 'Follow mine communications and never attempt unauthorized repairs'],
    emergency: 'Raise the alarm, give the location, warn others safely and follow the mine-specific emergency plan for surface or underground conditions.'
  },
  {
    id: 'utilities',
    title: 'Rural Utilities',
    label: 'Rural wildfire pathway',
    description: 'Fire-weather, infrastructure, vegetation, smoke and evacuation awareness for power and pipeline teams.',
    image: publicAsset('/images/utilities/infrastructure.jpg'),
    photos: [
      { src: publicAsset('/images/utilities/infrastructure.jpg'), alt: 'Utility infrastructure and transmission equipment', caption: 'Infrastructure and surrounding vegetation shape the work context.' },
      { src: publicAsset('/images/utilities/power-lines.jpg'), alt: 'Transmission lines crossing an open landscape at sunset', caption: 'Remote corridors require clear access and communication plans.' }
    ],
    hazards: ['Electrical equipment, transformers and substations', 'Vehicle, machinery and hot-work ignition sources', 'Vegetation near infrastructure', 'Wildfire weather and changing access', 'Smoke, AQHI and communication in remote corridors'],
    prevention: ['Follow qualified electrical and vegetation-management procedures', 'Monitor fire weather and work restrictions', 'Control hot work and vehicle sources', 'Use AQHI guidance and respiratory protection only within approved programs', 'Maintain remote communication and pre-planned access routes'],
    emergency: 'Report the hazard, isolate or move away only as authorized, notify dispatch or the site lead and follow coordinated evacuation and infrastructure notification procedures.'
  }
]

const highRiseLessons = [
  {
    title: 'Understanding fire hazards',
    intro: 'A fire hazard is a condition or material that could contribute to a fire or make its effects worse. Changing site conditions may introduce several hazards at the same time.',
    points: ['Temporary electrical systems, damaged extension cords and unsafe equipment', 'Welding, cutting, grinding and other spark-producing hot work', 'Fuel, solvents, adhesives, packaging and construction materials', 'Temporary heating placed, damaged or operated unsafely', 'Waste accumulation, poor housekeeping and blocked routes'],
    check: { question: 'What should a worker do after noticing a fire hazard?', options: ['Ignore it', 'Wait until the end of the week', 'Report it according to site procedures', 'Continue working without telling anyone'], answer: 2, explanation: 'Prompt reporting allows the hazard to be assessed and controlled according to the site plan.' }
  },
  {
    title: 'Fire prevention on construction sites',
    intro: 'Fire prevention reduces the chance of ignition and protects workers, equipment, materials and nearby property.',
    points: ['Use designated storage and follow product labels and safety data sheets', 'Follow hot-work authorization, required precautions, fire-watch and post-work monitoring', 'Report damaged cords or equipment and follow directions from qualified personnel', 'Remove waste and keep exits, stairs and equipment accessible', 'Use heating equipment according to manufacturer instructions and site requirements'],
    check: { question: 'What should workers do before hot work?', options: ['Start immediately', 'Ignore site rules', 'Follow authorization and safety procedures', 'Move fire equipment away'], answer: 2, explanation: 'Hot work requires authorization and an area controlled for sparks, combustibles, fire-watch and monitoring.' }
  },
  {
    title: 'Fire protection and emergency preparedness',
    intro: 'Fire protection arrangements change as a high-rise structure develops. Know what is available and keep access clear.',
    points: ['Know where extinguishers and designated equipment are located', 'Keep fire protection systems and access routes unobstructed', 'Know alarms, designated evacuation routes and assembly areas', 'Understand that protection arrangements may change by floor and work stage', 'Only use an extinguisher if trained, authorized and able to leave safely'],
    check: { question: 'When may a worker use a fire extinguisher?', options: ['Whenever smoke is visible', 'When trained, authorized and conditions are safe', 'Before raising the alarm', 'Instead of evacuating'], answer: 1, explanation: 'Personal safety and evacuation come first. Never delay evacuation or take unnecessary risks.' }
  },
  {
    title: 'Responding to fire emergencies',
    intro: 'A fire emergency requires a prompt, organized response under the site plan and directions from supervisors and emergency responders.',
    points: ['Raise the alarm or notify others using the established method', 'Evacuate by designated stairs or routes; do not use elevators unless directed', 'Proceed to the assigned assembly area and follow headcount procedures', 'Do not re-enter until authorization is given', 'Follow post-emergency instructions and report information only through authorized channels'],
    check: { question: 'What should a worker do after hearing the alarm on an upper floor?', options: ['Finish the task', 'Use an elevator', 'Evacuate by the designated route and report to assembly', 'Collect personal items'], answer: 2, explanation: 'Leave promptly using the established route and report to the assigned assembly area.' }
  }
]

const pathwayModules: Record<string, { title: string; intro?: string; points: string[]; noLive?: string }[]> = {
  'new-build': [
    { title: 'Look beyond the immediate task', intro: 'A safe arrangement can change as framing, trades and deliveries affect the work area.', points: ['Inspect around, above, below and across the task', 'Identify what can burn and what can ignite it', 'Consider sparks or heat moving into hidden areas', 'Account for other trades and the common evacuation route', 'Stop, warn people at risk and report through the site procedure'] },
    { title: 'Control materials and access', intro: 'Construction waste, packaging and products need controlled storage throughout the shift.', points: ['Remove waste through designated collection points', 'Keep stairs, exits and fire equipment unobstructed', 'Read labels and safety data sheets before using hazardous products', 'Follow approved containers and disposal arrangements', 'Assign area-specific housekeeping responsibility'] },
    { title: 'Recognize changing fire protection', intro: 'Open framing, enclosure and finishing stages introduce different combustible and access conditions.', points: ['Compare open framing with enclosed and finishing stages', 'Review temporary electrical and heating arrangements', 'Confirm newly installed protection before assuming it is operational', 'Reassess routes after deliveries or trade movement', 'Coordinate subcontractor activities and shared controls'] },
    { title: 'Coordinate emergency communication', intro: 'Clear alarm, status and assembly procedures help crews act together across overlapping trades.', points: ['Know how to raise the alarm and contact emergency services', 'Confirm designated routes and the assembly location', 'Report status through the site accountability process', 'Follow supervisor and emergency responder directions', 'Wait for re-entry authorization'] }
  ],
  'forestry': [
    { title: 'Wildfire weather and industrial ignition control', intro: 'Operational decisions begin with current fire weather and a check for ignition sources.', points: ['Use the Canadian Forest Fire Danger Rating System and Fire Weather Index', 'Check restrictions before chainsaw, machinery or hot work', 'Inspect spark-arrestors and control heavy-equipment friction', 'Maintain fire-watch and suppression-cache readiness', 'Stop or modify work when conditions require'] },
    { title: 'Smoke, PM2.5 and work modification', intro: 'Smoke can affect the respiratory and cardiovascular systems while work moves through changing conditions.', points: ['Recognize PM2.5 and noxious gases in wildfire smoke', 'Use AQHI as planning guidance, not as an occupational exposure limit', 'Adjust work-rest and heat monitoring through approved procedures', 'Move to cleaner-air or sheltered arrangements when directed', 'Report symptoms and changing exposure'] },
    { title: 'Respiratory protection and escape routes', intro: 'Protection and evacuation decisions require approved, workplace-specific controls.', points: ['Cloth gaiters and single-strap dust masks have limited protection', 'Use NIOSH-approved N95/P100 only as selected and approved', 'Follow CSA Z94.4, fit-testing, inspection and seal-check routines', 'Identify two routes before remote work begins', 'Communicate alternate routes and staging locations'] },
    { title: 'Remote response and evacuation drills', intro: 'Communication dead zones and smoke-obscured routes require rehearsal before an emergency.', points: ['Use satellite check-ins and established dead-zone procedures', 'Plan vehicle staging and shelter contingencies', 'Account for outdoor, indoor and deep-forest evacuation', 'Use simulated scenarios for reflection and debriefing', 'Follow qualified instruction for any practical suppression equipment'] },
  ],
  'mining': [
    { title: 'Understand mine fire risks', intro: 'Surface and underground operations face different access, smoke, fuel and equipment conditions.', points: ['Distinguish surface mobile equipment and processing risks', 'Recognize underground access, smoke and refuge considerations', 'Identify ignition sources, heat and combustible materials', 'Apply the fire triangle and early warning principles', 'Follow mine-specific emergency procedures'] },
    { title: 'Recognize common equipment hazards', intro: 'Heavy equipment, electrical systems and hot work can develop hazards during operation or maintenance.', points: ['Check for overheating, leaks, friction and damaged components', 'Keep clear of damaged cables, arcing and unsafe electrical equipment', 'Control hot work, nearby fuel, dust and other work groups', 'Manage hydraulic fluid and diesel storage safely', 'Do not attempt unauthorized repair or isolation'] },
    { title: 'Find warning signs and prevent escalation', intro: 'Early detection gives workers time to stop safely and report the developing condition.', points: ['Watch for unusual heat, smoke, sparks and burning smells', 'Report abnormal noise, leaks or visible damage', 'Inspect equipment before use and complete housekeeping', 'Control combustible dust around conveyors and processing equipment', 'Keep exits and firefighting equipment clear'] },
    { title: 'Report and respond by mine procedure', intro: 'Emergency response depends on the location, mine communication plan and assigned roles.', points: ['Raise the alarm and provide the location', 'Warn others without putting yourself at risk', 'Use surface or underground evacuation and refuge arrangements', 'Follow emergency communication and accountability', 'Leave specialist mine rescue and firefighting to trained assigned personnel'] }
  ],
  'utilities': [
    { title: 'Electrical and pipeline infrastructure', intro: 'Infrastructure work combines electrical, vehicle and vegetation ignition risks.', points: ['Identify transformers, substations, power lines and pipeline corridors', 'Follow qualified electrical isolation and work procedures', 'Control vegetation using authorized methods', 'Coordinate hot work and vehicle activity', 'Keep communication and access plans current'] },
    { title: 'Wildfire weather and work modification', intro: 'Fire-weather information and changing access determine whether work can continue safely.', points: ['Monitor official fire-weather and restriction information', 'Review smoke, wind and dry-vegetation conditions', 'Modify or suspend outdoor work through the employer process', 'Keep two routes and vehicle staging arrangements available', 'Coordinate field changes with dispatch'] },
    { title: 'Smoke management and respiratory limits', intro: 'Smoke planning includes AQHI, heat stress and approved respiratory protection.', points: ['Use AQHI as planning guidance, not an exposure limit', 'Monitor PM2.5 and noxious-gas exposure concerns', 'Use approved respirators only after required selection and fit testing', 'Recognize that cloth gaiters and dust masks provide limited protection', 'Report symptoms and changing work conditions'] },
    { title: 'Communication and evacuation', intro: 'Remote utility crews need accountability and a coordinated route before conditions deteriorate.', points: ['Confirm primary and alternate evacuation routes', 'Maintain dispatch or supervisor check-ins', 'Identify staging and assembly locations', 'Follow infrastructure notification procedures', 'Wait for authorization before re-entry'] }
  ]
}

const sourceDetails: Record<string, { eyebrow: string; title: string; sections: { title: string; text: string }[] }> = {
  'high-rise': {
    eyebrow: 'High-Rise Construction · Needs analysis',
    title: 'Why fire safety matters on a changing site',
    sections: [
      { title: 'Electrical hazards', text: 'Temporary power, tools and extension cords can become unsafe when damaged, overloaded or used incorrectly. Keep clear of unsafe equipment, remove it from use only as authorized, and report it through site procedures.' },
      { title: 'Hot work', text: 'Welding, cutting and other spark- or heat-producing tasks can ignite nearby combustibles or hidden materials. Follow site authorization, required area controls, fire-watch and post-work monitoring arrangements.' },
      { title: 'Flammable and combustible materials', text: 'Fuel, solvents, adhesives, packaging, wood and waste can add fuel to a fire. Use designated storage, follow product labels and safety data sheets, and keep materials away from ignition sources.' },
      { title: 'Temporary heating', text: 'Temporary heaters can create ignition hazards when damaged, unsuitable, poorly placed or operated contrary to instructions. Follow manufacturer guidance and site requirements and report concerns.' },
      { title: 'Housekeeping and changing protection', text: 'Construction stages change materials, access routes, temporary services and fire protection. Remove waste through approved arrangements and keep stairs, exits, equipment and emergency access clear.' }
    ]
  },
  'new-build': {
    eyebrow: 'New-Build Construction · 120-minute program',
    title: 'Changing work stages create changing fire risks',
    sections: [
      { title: 'Framing, materials and waste', text: 'Timber framing, packaging and construction waste add fuel. Use approved storage and collection arrangements and keep materials away from ignition sources and egress routes.' },
      { title: 'Temporary services and heating', text: 'Temporary electrical equipment and heaters change as the project advances. Follow inspection, manufacturer and site requirements; report damaged or unsafe equipment.' },
      { title: 'Hot work and finishing products', text: 'Welding, cutting, adhesives, paints and solvents require task-specific controls. Follow authorization, labels and safety data sheets, and review adjacent trades before work begins.' },
      { title: 'Changing access and fire protection', text: 'Open framing, enclosure and finishing stages affect routes, emergency access and protection arrangements. Recheck the project plan after deliveries, trade changes or other site changes.' },
      { title: 'Emergency readiness', text: 'Workers need to know how to raise an alarm, contact emergency services, use designated routes, assemble and report status. Confirm newly installed protection through site arrangements.' }
    ]
  },
  'mining': {
    eyebrow: 'Mining · Needs analysis',
    title: 'Surface and underground risks need different decisions',
    sections: [
      { title: 'Underground and surface conditions', text: 'Underground work can involve restricted access, smoke movement, limited escape routes and mine-specific refuge arrangements. Surface work may involve mobile equipment, fuel storage, electrical systems and processing plants; follow the mine plan for each location.' },
      { title: 'Mobile equipment and overheating', text: 'Haul trucks, loaders, conveyors, compressors and drills can develop friction, hot bearings or other failures. Unusual heat, smoke, burning smells, abnormal noise or fluid leaks are warning signs to report; do not investigate or repair unless authorized.' },
      { title: 'Electrical, hot-work and fuel hazards', text: 'Damaged cables, arcing, welding, cutting, diesel, oils and hydraulic fluids can contribute to ignition risk. Use mine authorization and controls, keep clear of damaged equipment and report leaks through site procedures.' },
      { title: 'Dust and conveyor systems', text: 'Dust around crushing, processing and conveying equipment may be combustible under suitable conditions. Belt friction, misalignment, hot bearings and poor housekeeping can contribute to hazards. Do not assume all mine dust is combustible; follow approved controls.' },
      { title: 'Smoke, wildfire and warning signs', text: 'Surface operations can be exposed to nearby wildfire and smoke; underground smoke can rapidly affect visibility and escape. PM2.5 and noxious gases are exposure concerns. AQHI is planning information, not an occupational exposure limit; particulate respirators do not protect against every gas or pollutant.' },
      { title: 'Remote readiness and equipment awareness', text: 'Maintain mine-specific communications, route and accountability plans. Rural field drills may cover inspection of Wajax pumps, intake hoses, backpack tanks, shovels, fire blankets and portable equipment; hands-on use requires qualified instruction and does not authorize specialist suppression.' }
    ]
  },
  'forestry': {
    eyebrow: 'Forestry · Rural wildfire safety context',
    title: 'Forestry hazard and response focus',
    sections: [
      { title: 'Ignition sources and fire weather', text: 'Chainsaws, logging machinery, heavy-equipment friction, hot work and slash clearing can provide ignition sources near dry forest fuels. Use current CFFDRS/FWI information, applicable work restrictions, spark-arrestor checks, fire watches and suppression-cache readiness under employer procedures.' },
      { title: 'Smoke inhalation and PM2.5', text: 'Wildfire smoke is a mixture of particles and gases that can irritate the lungs and affect cardiovascular health. PM2.5 is especially important for awareness, but AQHI is a public information tool and is not a workplace exposure limit.' },
      { title: 'Escape routes and entrapment', text: 'Dry vegetation, wind shifts and advancing fire can quickly compromise a single route. Crews should identify alternate paths, communicate their intended route to a supervisor and follow official and site directions.' },
      { title: 'Respiratory protection', text: 'Inspect, don and perform a user seal check on an approved NIOSH N95 where used. Cloth neck gaiters and single-strap dust masks provide limited protection. Particulate respirators do not protect against every smoke gas or pollutant.' },
      { title: 'Remote communications and field practice', text: 'Dead zones require planned satellite check-ins, vehicle staging, two-route plans and shelter contingencies. Rural drills may include Wajax pumps, intake hoses, backpack tanks, shovels and fire blankets; equipment practice requires qualified instruction and is not specialist firefighting certification.' },
      { title: 'Duties and response scope', text: 'Apply the employer’s procedures and the applicable Ontario workplace and forest-fire requirements. Workers report hazards and follow evacuation directions; this awareness course does not replace site-specific instruction.' }
    ]
  },
  'utilities': {
    eyebrow: 'Utilities · Rural wildfire operations context',
    title: 'Utility corridor hazard and response focus',
    sections: [
      { title: 'Power and pipeline corridors', text: 'Utility teams may encounter transformers, substations, power lines, pipeline infrastructure, vegetation and remote access roads. Work modifications must consider fire weather, equipment ignition and smoke conditions.' },
      { title: 'Ignition sources and work changes', text: 'Vehicles, machinery, hot work and vegetation near infrastructure can contribute to ignition risk. Monitor fire-weather information, follow applicable restrictions and use only qualified electrical and vegetation-management procedures.' },
      { title: 'Smoke and changing conditions', text: 'Locate official wildfire and air-quality updates promptly, use AQHI for planning guidance, monitor smoke and heat stress, and modify outdoor work under the employer’s approved procedures.' },
      { title: 'Communication and evacuation', text: 'Confirm the primary and alternate route, dispatch or supervisor communication method and staging location before conditions deteriorate. Follow coordinated evacuation and infrastructure notification processes.' },
      { title: 'Respiratory limits and field practice', text: 'A particulate respirator can reduce some particle exposure when properly selected, fit-tested and used, but it does not protect against every smoke gas. Rural drills may include portable cache checks and route practice under qualified instruction; they do not train unqualified workers to suppress fires.' },
      { title: 'Duties and response scope', text: 'Follow applicable workplace and forest-fire requirements, employer procedures and dispatch or incident directions. This awareness material does not replace site-specific orientation or qualified practical training.' }
    ]
  }
}

type ContentCard = { title: string; text: string }
type PathwayProfile = {
  duration: string
  audience: ContentCard[]
  methodFit: string
  objectives: ContentCard[]
  evaluation: ContentCard[]
  challenges: ContentCard[]
}

const ruralProgramObjectives: ContentCard[] = [
  { title: 'Evacuation deployment', text: 'Program target: reduce time from alarm through equipment stowage, vehicle boarding and convoy departure by 25%, measured in repeated, timed drills.' },
  { title: 'Retention', text: 'Program target: 100% of learners score at least 80% on the retention assessment administered 5–7 days after training; use targeted micro-lessons to address missed concepts.' },
  { title: 'Route navigation', text: 'Program target: 95% first-attempt success identifying and navigating an uncompromised primary, secondary or tertiary route during scenario practice and route walkthroughs.' },
  { title: 'Smoke and current conditions', text: 'Supporting objectives: 100% completion of required N95 inspection, donning and seal-check steps; within five minutes of a simulated alert, find current wildfire and air-quality information; communicate an alternate route within three minutes.' }
]

const ruralChallenges: ContentCard[] = [
  { title: 'Cost across multiple delivery modes', text: 'Use the proposed $7,000 pilot framework, reusable equipment and existing course materials where suitable; the figures are planning estimates, not market quotations.' },
  { title: 'Time and seasonal scheduling', text: 'Deliver the 8-hour program in modular blocks, pairing self-paced preparation with focused instruction, simulation and planned field practice.' },
  { title: 'Remote connectivity and technology', text: 'Provide low-bandwidth or downloadable materials, supported devices and facilitated alternatives for crews with limited coverage or digital access.' },
  { title: 'PPE limits and changing conditions', text: 'Treat respirators as one control layer; combine approved protection with exposure reduction, work-rest changes, cleaner-air breaks and early evacuation under site procedures.' },
  { title: 'Different experience levels', text: 'Use plain-language foundations, Day 5–7 retention checks, remediation and periodic scenario refreshers to address knowledge gaps.' }
]

const constructionChallenges: ContentCard[] = [
  { title: 'Limited time', text: 'Break the course into short lessons and schedule completion with supervisors around the work plan.' },
  { title: 'Low participation', text: 'Connect examples to current site tasks and invite crew discussion about changing conditions.' },
  { title: 'Language barriers', text: 'Use plain language, clear visuals and approved translated materials where available.' },
  { title: 'Limited technology', text: 'Provide access to a suitable shared device or an instructor-led alternative.' },
  { title: 'Changing site conditions', text: 'Review routes, temporary services, work stages and emergency arrangements as the site changes.' }
]

const pathwayProfiles: Record<string, PathwayProfile> = {
  'high-rise': {
    duration: 'Four lessons with lesson checks and a final knowledge assessment.',
    audience: [
      { title: 'Construction workers and trades', text: 'Recognize changing hazards, use site controls, report unsafe conditions and follow the current emergency plan.' },
      { title: 'Supervisors and site leads', text: 'Coordinate work, hot-work controls, fire-watch arrangements, housekeeping, access and worker instruction.' },
      { title: 'Safety officers, JHSCs and employers', text: 'Support training, review site-specific arrangements and use observations and feedback to identify gaps.' }
    ],
    methodFit: 'Use short lessons and toolbox discussions for site examples; practise alarm, route and accountability actions through supervised, site-approved exercises.',
    objectives: [
      { title: 'Hazard recognition', text: 'By the end of training, identify at least five common high-rise construction fire hazards.' },
      { title: 'Prevention', text: 'By the end of training, identify at least four fire-prevention practices.' },
      { title: 'Knowledge assessment', text: 'Complete the final assessment with a score of at least 80%; this does not demonstrate practical competency by itself.' }
    ],
    evaluation: [
      { title: 'Before and after', text: 'Use a pre-training check and the final knowledge assessment to identify learning needs and understanding of hazards, prevention and response.' },
      { title: 'Workplace follow-up', text: 'Collect worker feedback and observe hazard reporting, housekeeping and use of site procedures.' },
      { title: 'Four-level review', text: 'Evaluate reaction, learning, behaviour and results; interpret workplace trends in context rather than treating a single measure as proof.' }
    ],
    challenges: constructionChallenges
  },
  'new-build': {
    duration: '120-minute core course with four distinct modules and a capstone assessment.',
    audience: [
      { title: 'Workers across construction trades', text: 'Recognize hazards around framing, finishing products, temporary services and shared work areas.' },
      { title: 'Supervisors and project managers', text: 'Coordinate hot work, deliveries, trade interfaces, changing routes and accountability.' },
      { title: 'Safety officers, JHSCs and employers', text: 'Support access to current plans, practical demonstrations and follow-up when controls or site stages change.' }
    ],
    methodFit: 'Use construction-scene hazard recognition, delivery and hot-work scenarios, short online lessons, toolbox discussion and supervised demonstrations tied to the project plan.',
    objectives: [
      { title: 'Hazard recognition', text: 'In the 120-minute core course, identify at least five fire hazards in construction scenes and match each to a prevention action.' },
      { title: 'Changing work', text: 'Correctly explain the stop-and-review response in two scenarios where conditions change after hot-work authorization.' },
      { title: 'Communication and completion', text: 'Give a simulated report with location, access, observed conditions and people at risk; identify the assembly point and accountability contact; achieve at least 8/10 and demonstrate all critical practical actions.' }
    ],
    evaluation: [
      { title: 'Knowledge', text: 'Use an opening check, lesson questions and a final ten-question quiz; the proposed threshold is 8/10.' },
      { title: 'Applied decisions', text: 'Review hot-work changes, smoke response, emergency reporting and accountability in scenarios and a practical checklist.' },
      { title: 'Follow-up', text: 'Gather learner feedback and workplace observations; provide coaching and a repeat demonstration for missed critical actions.' }
    ],
    challenges: constructionChallenges
  },
  forestry: {
    duration: 'Industry pathway within the 8-hour blended Rural Wildfire Safety Program.',
    audience: [
      { title: 'Forestry and logging crews', text: 'Prepare for ignition sources, dry fuels, smoke, remote access and changing weather at the worksite.' },
      { title: 'Operations supervisors and camp/site leads', text: 'Translate current fire-weather and air-quality information into work decisions, check-ins, staging and routes.' },
      { title: 'Safety officers, JHSCs and employers', text: 'Support approved respiratory programs, practical checks, drills and follow-up across dispersed crews.' }
    ],
    methodFit: 'Combine the rural program’s in-class briefing, mobile micro-lessons, simulated scenarios and qualified field drills; apply fire-weather, smoke and evacuation examples to forestry work.',
    objectives: ruralProgramObjectives,
    evaluation: [
      { title: 'Knowledge and retention', text: 'Use lesson checks and the formal retention assessment 5–7 days after training; remediate missed concepts.' },
      { title: 'Practical actions', text: 'Observe respirator inspection and seal-check steps, communications, route choice and evacuation drills under qualified supervision.' },
      { title: 'Program outcomes', text: 'Compare drill times and route-navigation results with the rural program targets; record worker feedback and site observations.' }
    ],
    challenges: ruralChallenges
  },
  mining: {
    duration: 'Mining pathway within the 8-hour blended Rural Wildfire Safety Program; the online mining module is 30–40 minutes.',
    audience: [
      { title: 'Surface and underground mine workers', text: 'Recognize equipment, electrical, hot-work, fuel, dust and smoke hazards and use mine-specific reporting and response procedures.' },
      { title: 'Operations supervisors and site leads', text: 'Coordinate shutdown awareness, communications, surface access, underground evacuation and refuge information under the mine plan.' },
      { title: 'Safety officers, JHSCs and employers', text: 'Provide site orientation and qualified practical training; this awareness course is not mine-rescue or firefighting certification.' }
    ],
    methodFit: 'Pair the mining hazard-recognition module and video with equipment and smoke scenarios, tabletop communication using the mine plan, and separately qualified practical drills.',
    objectives: [
      { title: 'Hazard recognition', text: 'Mining-module target: at least 90% of participants identify five common hazards—overheating machinery, electrical hazards, hot work, flammable materials and combustible dust.' },
      { title: 'Warning signs and prevention', text: 'Mining-module target: at least 80% recognize four or more early warning signs and select preventive measures.' },
      { title: 'Reporting', text: 'Mining-module target: at least 85% select appropriate hazard-reporting actions in a scenario-based assessment.' },
      ...ruralProgramObjectives
    ],
    evaluation: [
      { title: 'Knowledge', text: 'Use a pre-test, visual hazard activity, lesson questions and scenario assessment; compare results without treating a quiz as practical competency.' },
      { title: 'Practical response', text: 'Use mine-approved observation and drills for communication, accountability and evacuation; mine rescue and firefighting training remain separate.' },
      { title: 'Continuous improvement', text: 'Review recurring misunderstandings, learner feedback, inspection findings and follow-up observations; protect individual records under the organization’s process.' }
    ],
    challenges: ruralChallenges
  },
  utilities: {
    duration: 'Industry pathway within the 8-hour blended Rural Wildfire Safety Program.',
    audience: [
      { title: 'Utility and right-of-way crews', text: 'Prepare for wildfire, smoke, vegetation, electrical and vehicle ignition risks along power, pipeline and infrastructure corridors.' },
      { title: 'Operations supervisors, dispatch and site leads', text: 'Coordinate current alerts, work modifications, communications, access routes and infrastructure notifications.' },
      { title: 'Safety officers, JHSCs and employers', text: 'Support approved exposure controls, qualified work procedures, drills and records across remote teams.' }
    ],
    methodFit: 'Use the blended rural program with utility-corridor scenarios, dispatch check-ins, route planning and qualified demonstrations tied to the employer’s procedures.',
    objectives: ruralProgramObjectives,
    evaluation: [
      { title: 'Knowledge and retention', text: 'Use lesson checks and a Day 5–7 retention assessment; offer targeted remediation when a learner misses required concepts.' },
      { title: 'Practical actions', text: 'Observe communications, route decisions and evacuation practice; respirator tasks must follow the employer’s approved program.' },
      { title: 'Program outcomes', text: 'Compare timed deployment and route-navigation observations with the stated rural program targets and document site-specific follow-up.' }
    ],
    challenges: ruralChallenges
  }
}

const methods = [
  ['Instructor-led training', 'Site-based briefing, case study and facilitated crew discussion.', 'Builds a shared safety baseline and allows questions tied to site plans.', 'Needs a qualified facilitator and crew scheduling.'],
  ['Interactive mobile / personal-device modules', 'Self-paced short units with branching scenarios, knowledge checks and digital job aids.', 'Repeatable for dispersed crews; can support Day 5–7 quiz remediation.', 'Device access, connectivity and digital confidence may vary.'],
  ['Virtual-reality simulation', 'Supervised, repeatable simulations with time for calibration and debrief.', 'Allows safe rehearsal of wind shifts, smoke routes and decision-making.', 'Equipment and access may be costly; simulation cannot reproduce every field condition.'],
  ['Hands-on field drills', 'Supervised practice in an appropriate controlled setting.', 'Supports observed route, communication, equipment and evacuation actions.', 'Requires preparation, suitable equipment, qualified instruction and safe conditions.'],
  ['Practical demonstrations', 'Qualified personnel demonstrate approved tasks such as a respirator seal check or site-specific procedure.', 'Connects information to observable actions and provides corrective feedback.', 'Must follow the employer’s program and does not authorize work beyond a learner’s role.'],
  ['Online scenario-based learning', 'Short decision points, visual hazard activities and immediate explanatory feedback.', 'Available for repeat practice and supports low-bandwidth learning when designed appropriately.', 'A quiz or simulation alone does not establish practical competence or current site knowledge.']
] as const

const ruralProgramModules: ContentCard[] = [
  { title: '1. Wildfire risk, regulations and ignition control', text: 'Review Canadian wildfire and smoke risks, PM2.5 and gases, worker and employer duties under OHSA and FFPA, the O. Reg. 207/96 reference, fire-weather information, work restrictions, heavy-equipment friction, hot work, chainsaws, slash clearing, spark-arrestors, fire watches and suppression-cache readiness.' },
  { title: '2. Smoke, AQHI and respiratory protection', text: 'Use Government of Canada AQHI information for planning—not as an occupational exposure limit. Address work-rest and heat stress, respirator selection and approved program requirements, including inspection, donning, doffing, fit testing and user seal checks. Particulate respirators do not protect against every smoke gas or pollutant.' },
  { title: '3. High-stress fire and smoke scenarios', text: 'Use simulated—not live-fire—practice for early smoke or ignition detection, safe equipment shutdown decisions, wind shifts, smoke-obscured routes, low-visibility driving, haul-road bottlenecks and communication dead zones. Reflect and debrief after each scenario.' },
  { title: '4. Field equipment and evacuation drills', text: 'Under qualified instruction, review Wajax pumps, intake hoses, backpack pump tanks, shovels, fire blankets and portable equipment checks. Practise two-route planning, satellite check-ins, indoor/outdoor/deep-forest evacuation, vehicle staging, shelter contingencies, accountability and post-evacuation re-entry sweeps.' }
]

const newBuildTopicLibrary = [
  'Housekeeping', 'Hot work', 'Fire watch', 'Temporary heaters', 'Cylinders', 'Temporary electrical equipment', 'Batteries', 'Flammable products', 'Extinguishers', 'Alarms', 'Evacuation', 'Emergency access', 'Supervision', 'Roofing', 'Inspections', 'End-of-shift prevention', 'Controlled return after a fire'
]

type HazardOption = { label: string; correct: boolean; explanation: string }
type HazardActivity = { prompt: string; image: string; alt: string; options: HazardOption[] }

const hazardActivities: Record<string, HazardActivity> = {
  'high-rise': {
    prompt: 'The crew is preparing for hot work on an active floor. Select every condition or control that needs attention.',
    image: publicAsset('/images/highrise/site-workers.jpg'),
    alt: 'Construction workers coordinating around materials on an active site',
    options: [
      { label: 'Confirm site hot-work authorization and required fire-watch arrangements', correct: true, explanation: 'Hot work must follow the site authorization, area-control and monitoring procedures.' },
      { label: 'Check for combustible materials in and around the work area', correct: true, explanation: 'Sparks and heat can ignite nearby or concealed materials.' },
      { label: 'Keep stairs, exits and fire equipment accessible', correct: true, explanation: 'Egress and emergency equipment must remain clear as site work changes.' },
      { label: 'Assume an earlier permit is still valid after site conditions change', correct: false, explanation: 'A change in conditions requires a stop-and-review through the responsible site process.' }
    ]
  },
  'new-build': {
    prompt: 'A delivery and finishing task are happening beside temporary services. Select every condition or control that needs attention.',
    image: publicAsset('/images/new-build/framing.jpg'),
    alt: 'Timber framing at a new-build construction site',
    options: [
      { label: 'Keep delivery materials and construction waste out of stairs and exits', correct: true, explanation: 'Shared access and egress must remain clear for all trades.' },
      { label: 'Store adhesives, paints and solvents as their labels and site plan require', correct: true, explanation: 'Product-specific storage and handling reduce exposure to ignition sources.' },
      { label: 'Review temporary electrical and heating equipment before work', correct: true, explanation: 'Temporary equipment and services need to be suitable and used according to instructions and site requirements.' },
      { label: 'Place packaging beside a heater until the end of the shift', correct: false, explanation: 'Combustible packaging should be controlled and kept away from ignition sources.' }
    ]
  },
  forestry: {
    prompt: 'A remote forestry crew receives a fire-weather update as smoke begins to move across the work area. Select every safe planning action.',
    image: publicAsset('/images/forestry/forest-road.jpg'),
    alt: 'A forest access road through dense woodland',
    options: [
      { label: 'Check current fire-weather information and applicable work restrictions', correct: true, explanation: 'CFFDRS/FWI information supports work decisions under employer procedures.' },
      { label: 'Confirm primary and alternate routes, staging and crew check-ins', correct: true, explanation: 'Remote access and communication dead zones require plans before conditions deteriorate.' },
      { label: 'Use AQHI as planning information and follow exposure-control procedures', correct: true, explanation: 'AQHI is not an occupational exposure limit; use the employer’s controls and current guidance.' },
      { label: 'Continue on the original route without reporting a wind or visibility change', correct: false, explanation: 'Changing conditions must be communicated and the site’s alternate-route plan followed.' }
    ]
  },
  mining: {
    prompt: 'A worker notices unusual heat and a fluid leak near mobile equipment. Select every safe response.',
    image: publicAsset('/images/mining/maintenance-workshop.png'),
    alt: 'Mine workers and large equipment inside a maintenance workshop',
    options: [
      { label: 'Stop or withdraw safely and report the equipment location and warning signs', correct: true, explanation: 'Early, precise reporting supports the mine response without exposing the worker to unnecessary risk.' },
      { label: 'Keep clear and leave inspection, isolation or repair to authorized personnel', correct: true, explanation: 'Workers should not investigate or repair dangerous equipment unless authorized and qualified.' },
      { label: 'Follow mine-specific communication and evacuation instructions if conditions worsen', correct: true, explanation: 'Surface and underground actions depend on the mine emergency plan and location.' },
      { label: 'Open hot components to find the source of the leak', correct: false, explanation: 'Do not investigate hot or potentially dangerous equipment; report and follow mine procedures.' }
    ]
  },
  utilities: {
    prompt: 'Dry vegetation and smoke affect a remote utility corridor near electrical infrastructure. Select every safe planning action.',
    image: publicAsset('/images/utilities/infrastructure.jpg'),
    alt: 'Utility infrastructure and transmission equipment',
    options: [
      { label: 'Check official fire-weather information and work restrictions', correct: true, explanation: 'Use current information and employer procedures to decide whether work must change.' },
      { label: 'Coordinate route, check-in and work changes with dispatch or the site lead', correct: true, explanation: 'Remote crews need coordinated access, accountability and notification.' },
      { label: 'Use only authorized electrical and vegetation-management procedures', correct: true, explanation: 'Qualified personnel and approved procedures must govern work near infrastructure.' },
      { label: 'Cut vegetation or isolate equipment without authorization', correct: false, explanation: 'Do not perform electrical or vegetation work outside your authorization and procedures.' }
    ]
  }
}

const assessment = [
  ['Which activity can create a fire hazard on a high-rise site?', ['Welding or grinding', 'Reading a plan', 'Walking to the office', 'Filing a report'], 0, 'Welding and grinding produce heat or sparks that can ignite nearby combustible materials.'],
  ['What should happen to a damaged electrical cord?', ['Use it briefly', 'Remove it from service and report it', 'Tape it', 'Hide it'], 1, 'Do not use damaged equipment; report it and follow site procedures for removing it from service.'],
  ['What is a key housekeeping goal?', ['Keep egress routes clear', 'Store waste in stairs', 'Block access lanes', 'Move combustibles to exits'], 0, 'Keep stairs, exits, emergency equipment and access routes clear.'],
  ['When may a worker use an extinguisher?', ['Whenever smoke is visible', 'Only when trained, authorized and conditions are safe', 'Before raising the alarm', 'Instead of evacuating'], 1, 'Raise the alarm and evacuate as directed; use an extinguisher only when trained, authorized and able to leave safely.'],
  ['What should an evacuation alarm prompt?', ['Wait for flames', 'Leave as directed', 'Use an elevator', 'Return for tools'], 1, 'Follow the site’s alarm and evacuation procedure promptly; do not delay for belongings or visible flames.'],
  ['What are CFFDRS and FWI used for?', ['Fire-weather and operational decisions', 'A respirator fitting score', 'A building floor count', 'A radio serial number'], 0, 'Fire-weather information supports work restrictions and operational decisions under the employer’s procedures.'],
  ['What should PM2.5 awareness lead to?', ['Uncontrolled outdoor work', 'AQHI/site procedures and appropriate respiratory protection', 'Thinking AQHI is an exposure limit', 'Opening a smoke-filled area'], 1, 'Use AQHI as planning information, not an occupational exposure limit, and follow approved exposure-control procedures.'],
  ['What is the first action in an underground smoke report?', ['Enter to investigate', 'Raise the alarm and follow the mine emergency plan', 'Use any route', 'Wait for visible flames'], 1, 'Raise the alarm, give the location and follow the mine-specific emergency plan; do not enter to investigate.'],
  ['How do particulate respirators protect?', ['Against every smoke gas', 'Only for approved particles according to the program', 'For every pollutant', 'With no fit testing'], 1, 'Particulate respirators do not protect against every smoke gas or pollutant and must be selected and used under an approved program.'],
  ['Is this website a wildland firefighter certification?', ['Yes, after the quiz', 'No; it is educational awareness only', 'Yes, for remote crews', 'Only with PM2.5'], 1, 'Website completion does not certify a person or replace employer-specific training, site orientation or qualified practical instruction.']
] as const

function useProgress() {
  const [progress, setProgress] = useState<{ explored: string[]; score: number | null }>(() => JSON.parse(localStorage.getItem('fireready-progress') || '{"explored":[],"score":null}'))
  useEffect(() => localStorage.setItem('fireready-progress', JSON.stringify(progress)), [progress])
  return [progress, setProgress] as const
}

const pathwayPaths: Record<string, string> = {
  'new-build': '/new-build',
  'high-rise': '/high-rise',
  forestry: '/forestry',
  mining: '/mining',
  utilities: '/rural-utilities'
}

function pathwayHref(id: string) {
  return pathwayPaths[id] || '/training'
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['/', 'Home'], ['/program', 'Program'], ['/training', 'Training Module'], ['/evaluation', 'Evaluation'], ['/resources', 'Resources'], ['/about', 'About Us']]
  return <header className="site-header"><div className="container nav-wrap"><Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><Flame size={19}/></span><span>FireReady <small>Workplace</small></span></Link><button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button><nav className={open ? 'open' : ''}>{links.map(([href, label]) => <NavLink end={href === '/'} key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}<Link className="button small" to="/high-rise" onClick={() => setOpen(false)}>Start training <ArrowRight size={14}/></Link></nav></div></header>
}

function Footer() {
  return <footer><div className="container footer-grid"><div><div className="brand"><span className="brand-mark"><Flame size={18}/></span><span>FireReady <small>Workplace</small></span></div><p>Recognize the risk. Prevent the fire. Protect the workplace.</p></div><div><strong>Explore</strong><Link to="/program">Program</Link><Link to="/training">Training pathways</Link><Link to="/resources">Resources</Link></div><div><strong>Important</strong><span>Educational awareness only</span><span>Follow site-specific procedures</span></div></div></footer>
}

function Layout({ children }: { children: React.ReactNode }) { return <><Header/><main>{children}</main><Footer/></> }

function Home() {
  return <>
    <section className="hero"><img src={publicAsset('/images/home/construction.jpg')} alt="Workers on a high-rise construction site"/><div className="hero-shade"/><div className="container hero-copy"><p className="eyebrow"><ShieldCheck size={15}/> Workplace fire safety training</p><h1>Recognize the risk. <em>Prevent the fire.</em> Protect the workplace.</h1><p className="lead">Practical, scenario-based awareness for Canadian construction, forestry, mining and utility teams.</p><div className="actions"><Link className="button" to="/training">Explore training <ArrowRight size={16}/></Link><Link className="button ghost" to="/high-rise">Start with high-rise <ChevronRight size={16}/></Link></div></div></section>
    <section className="section"><div className="container split"><div><p className="eyebrow">Welcome to FireReady</p><h2>Two programs. One practical safety language.</h2></div><p className="lead">FireReady combines detailed high-rise construction learning with a separate 8-hour rural wildfire safety program for forestry, mining and utility operations. Use the pathway that reflects the workplace.</p></div></section>
    <section className="section cream"><div className="container"><div className="heading"><div><p className="eyebrow">Choose your pathway</p><h2>Training shaped by the work.</h2></div><Link className="text" to="/training">View all pathways <ArrowRight size={15}/></Link></div><div className="industry-grid">{industries.map(i => <Link className="industry-card" to={pathwayHref(i.id)} key={i.id}><img src={i.image} alt=""/><div className="industry-card-copy"><small>{i.label}</small><h3>{i.title}</h3><p>{i.description}</p><strong>Explore pathway <ArrowRight size={14}/></strong></div></Link>)}</div></div></section>
    <section className="section"><div className="container split"><div><p className="eyebrow">What you will learn</p><h2>Awareness that travels to the worksite.</h2></div><ul className="check-list">{['Recognize construction and industrial fire hazards', 'Apply prevention and changing-work controls', 'Understand smoke, AQHI and respiratory limits', 'Make safe reporting and evacuation decisions'].map(x => <li key={x}><Check size={17}/>{x}</li>)}</ul></div></section>
  </>
}

function Program() {
  const audiences = ['Field operations personnel', 'Construction workers and supervisors', 'Forestry harvesting crews', 'Surface and underground mine workers', 'Utility corridor and right-of-way technicians', 'Camp and site leads', 'Safety officers and JHSCs', 'Employers and project managers']
  return <section className="section page"><div className="container"><p className="eyebrow">The FireReady program</p><h1>Learning for the moment that matters.</h1><p className="lead">FireReady contains two connected but distinct programs: detailed high-rise construction fire safety and an 8-hour rural wildfire safety program for remote industrial operations.</p>
    <div className="program-summary-grid"><article><h3>Purpose</h3><p>Build workplace awareness through practical situations, short lessons, discussion and knowledge checks. Follow employer procedures and use qualified instruction for practical tasks.</p></article><article><h3>Program planning</h3><p>Scope the audience and needs, set objectives, develop and review content, test the learning activities, pilot delivery and revise using feedback and observed performance.</p></article><article><h3>Employer use</h3><p>Repeatable modules and practical records can help distributed teams identify learning gaps and plan coaching. Use pathway materials to support toolbox talks and supervised practice; online completion alone does not establish legal compliance or practical competency.</p></article></div>
    <h2 className="section-title">Kolb's experiential learning cycle</h2><div className="cycle">{[['01', 'Concrete experience', 'Encounter a realistic site situation.'], ['02', 'Reflective observation', 'Examine hazards and decisions.'], ['03', 'Abstract conceptualization', 'Connect the event to safety principles.'], ['04', 'Active experimentation', 'Apply learning to a new workplace example.']].map(x => <article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
    <div className="rural-program-overview"><p className="eyebrow">Rural Wildfire Safety · 8-hour blended program</p><h2>Four connected modules, from awareness to field practice.</h2><div className="course-card-grid">{ruralProgramModules.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div><p className="program-duration-note">Completion requires all four modules, critical practical actions demonstrated during field drills, and at least 80% on the retention assessment administered 5–7 days later. Website completion does not certify a wildland firefighter.</p></div>
    <div className="two"><article className="panel"><p className="eyebrow">Target audiences</p><h2>Roles and responsibilities</h2><ul className="check-list">{audiences.map(x => <li key={x}><Check size={16}/>{x}</li>)}</ul><p>Workers apply procedures and report hazards; supervisors coordinate work and emergency arrangements; safety officers and JHSCs help review needs and feedback; employers and project managers provide resources, instruction and site-specific plans.</p></article><article className="panel"><p className="eyebrow">SMART objectives</p><h2>High-rise construction benchmarks</h2><ul className="check-list"><li><Check size={16}/>Identify at least five common high-rise fire hazards.</li><li><Check size={16}/>Identify at least four fire-prevention practices.</li><li><Check size={16}/>Achieve at least 80% on the final assessment.</li></ul><h2>Rural wildfire program targets</h2><ul className="check-list"><li><Check size={16}/>Target a 25% reduction in evacuation deployment time.</li><li><Check size={16}/>Target 100% of learners scoring at least 80% on a retention quiz 5–7 days later.</li><li><Check size={16}/>Target 95% first-attempt success navigating an uncompromised evacuation route.</li><li><Check size={16}/>Complete all required N95 inspection, donning and seal-check steps.</li><li><Check size={16}/>Within five minutes of a simulated alert, locate wildfire and air-quality information and identify precautions.</li><li><Check size={16}/>Identify an alternative route and communicate it within three minutes.</li></ul><p>These are program targets to measure, not results already achieved.</p></article></div>
    <div className="program-design"><p className="eyebrow">Objectives and design</p><h2>Built for different workplaces and access needs.</h2><div className="challenge-grid">{[['Simple navigation', 'Clearly named pages and sections help learners find the right pathway and return to it.'], ['Visual and interactive learning', 'Workplace images, scenarios, quizzes and explanatory feedback support active learning.'], ['Mobile and low-bandwidth access', 'Responsive layouts and concise content support phone, tablet and remote-site use.'], ['Accessible and language-aware', 'Readable layouts and plain language support diverse learners; the design is ready for English/French content when approved translations are available.']].map(x => <article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></div>
    <h2 className="section-title">Blended training methods</h2><div className="method-table"><div className="method-row method-head"><b>Method</b><b>How it works</b><b>Benefits</b><b>Limitations</b></div>{methods.map(row => <div className="method-row" key={row[0]}>{row.map((cell, i) => i === 0 ? <b key={cell}>{cell}</b> : <span key={cell}>{cell}</span>)}</div>)}</div>
    <div className="program-design"><p className="eyebrow">Objectives and design</p><h2>Built for different workplaces and access needs.</h2><div className="challenge-grid">{[['Simple navigation', 'Clearly named pages and sections help learners find the right pathway and return to it.'], ['Visual and interactive learning', 'Workplace images, scenarios, quizzes and explanatory feedback support active learning.'], ['Mobile and low-bandwidth access', 'Responsive layouts and concise content support phone, tablet and remote-site use.'], ['Accessible and language-aware', 'Readable layouts and plain language support diverse learners; the design is ready for English/French content when approved translations are available.']].map(x => <article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></div>
  </div></section>
}

function Training() {
  return <section className="section page"><div className="container"><p className="eyebrow">Industry pathways</p><h1>Choose the work context.</h1><p className="lead">Construction and rural wildfire safety are distinct programs with different hazards, controls and emergency arrangements. Open a pathway for its needs analysis, audience, methods, objectives, modules, evaluation and challenges.</p><div className="industry-grid">{industries.map(i => <Link className="industry-card" to={pathwayHref(i.id)} key={i.id}><img src={i.image} alt={i.title}/><div className="industry-card-copy"><small>{i.label}</small><h3>{i.title}</h3><p>{i.description}</p><strong>Enter pathway <ArrowRight size={14}/></strong></div></Link>)}</div></div></section>
}

const courseSectionLinks = [
  ['introduction', 'Introduction'],
  ['needs-analysis', 'Needs Analysis'],
  ['target-audience', 'Target Audience'],
  ['training-methods', 'Training Methods'],
  ['objectives-design', 'Objectives and Design'],
  ['training-module', 'Training Module'],
  ['evaluation-method', 'Evaluation Method'],
  ['challenges-solutions', 'Challenges and Solutions']
] as const

function IndustryPage({ fixedId }: { fixedId?: string } = {}) {
  const { id: routeId = 'high-rise' } = useParams()
  const industry = industries.find(i => i.id === (fixedId || routeId)) || industries[0]
  const profile = pathwayProfiles[industry.id]
  const activity = hazardActivities[industry.id]
  const [tab, setTab] = useState<'hazards' | 'prevention' | 'emergency'>('hazards')
  const [lesson, setLesson] = useState(0)
  const [lessonChoice, setLessonChoice] = useState<number | null>(null)
  const [module, setModule] = useState(0)
  const [scenarioChoice, setScenarioChoice] = useState<number | null>(null)
  const [activitySelection, setActivitySelection] = useState<number[]>([])
  const [activitySubmitted, setActivitySubmitted] = useState(false)
  const [progress, setProgress] = useProgress()
  const hLesson = highRiseLessons[lesson]
  const pathwayData = pathwayModules[industry.id] || []
  const pathwayModule = pathwayData[module] || pathwayData[0]
  const markExplored = () => setProgress(p => ({ ...p, explored: [...new Set([...p.explored, industry.id])] }))
  const scenarios: Record<string, [string, string[], number, string][]> = {
    'high-rise': [
      ['A damaged extension cord is beside combustible waste.', ['Use it carefully', 'Remove it from service and report it', 'Cover it with cardboard', 'Move waste closer'], 1, 'Damaged electrical equipment must be removed from service and reported.'],
      ['Combustible waste remains near scheduled welding.', ['Begin quickly', 'Wet the waste', 'Stop and control the area before hot work', 'Ask a visitor to watch'], 2, 'Hot work requires authorization and controlled conditions.'],
      ['Smoke comes from temporary electrical equipment.', ['Open the panel', 'Raise the alarm and follow procedures', 'Pour water on it', 'Wait'], 1, 'Raise the alarm and keep clear; do not investigate energized equipment.'],
      ['An evacuation stairwell is blocked.', ['Use it anyway', 'Report it and use the designated alternate route', 'Hide materials', 'Wait'], 1, 'Blocked egress is urgent and must be reported.'],
      ['The fire alarm activates on an upper floor.', ['Finish work', 'Use the elevator', 'Evacuate and report to assembly', 'Collect belongings'], 2, 'Evacuate promptly using designated routes.']
    ],
    mining: [
      ['A machine smells of burning but has no visible flames.', ['Continue working', 'Open the compartment', 'Stop safely, report and follow procedure', 'Wait for smoke'], 2, 'Report early and do not investigate or repair unless authorized.'],
      ['Smoke rises and one access road may close.', ['Use any road', 'Continue until flames are visible', 'Follow site instructions and confirm the route', 'Attempt an unauthorized firebreak'], 2, 'A coordinated response keeps workers out of unsafe routes.'],
      ['You see smoke at a working level underground.', ['Enter the area to investigate', 'Raise the alarm and report the exact level and location', 'Wait for visible flames', 'Use another route without notifying anyone'], 1, 'Give mine control the precise level and location, then follow the mine emergency plan.'],
      ['A haul truck overheats on surface.', ['Keep operating', 'Park safely and report', 'Open hot components', 'Ignore the gauge'], 1, 'Stop safely and report before unauthorized investigation or repair.']
    ],
    forestry: [
      ['Wind shifts and smoke obscures the only known route.', ['Continue on memory', 'Follow the established alternate and report', 'Drive faster', 'Split the crew'], 1, 'Use pre-planned routes and communicate the change.'],
      ['Chainsaw work begins during high fire danger.', ['Ignore restrictions', 'Check CFFDRS/FWI, spark-arrestor and work restrictions', 'Work outside the plan', 'Hide sparks'], 1, 'Fire-weather and equipment controls guide safe decisions.'],
      ['Smoke causes coughing in a remote crew.', ['Continue work', 'Report, reduce exposure and follow approved controls', 'Remove approved PPE', 'Move downwind'], 1, 'Report symptoms and follow AQHI, work-rest and respiratory programs.']
    ],
    utilities: [
      ['Vegetation is close to electrical infrastructure in dry conditions.', ['Ignore it', 'Report it and use authorized vegetation procedures', 'Burn it away', 'Cut it without authorization'], 1, 'Qualified vegetation and electrical procedures must govern.'],
      ['Smoke reduces visibility on a remote utility road.', ['Choose any route', 'Follow dispatch, confirm route and evacuate as directed', 'Wait for flames', 'Leave without reporting'], 1, 'Coordinate route changes and accountability through dispatch or the site lead.']
    ],
    'new-build': [
      ['A delivery blocks a stair being used as an evacuation route.', ['Leave it until the delivery is unpacked', 'Report it promptly and follow the site route and access procedure', 'Move it without checking the load or site process', 'Use the blocked stair anyway'], 1, 'Keep egress clear, alert the responsible site lead and use only a designated alternate route under the site plan.'],
      ['Solvents are stored beside temporary heating.', ['Move the heater closer', 'Stop and store materials according to the plan', 'Cover the heater', 'Leave for later'], 1, 'Separate temporary heat and combustibles according to product and site controls.'],
      ['A finishing crew changes the evacuation route.', ['Assume it is safe', 'Report and confirm the project plan', 'Remove signs', 'Use the old route'], 1, 'Changing work stages require route and emergency-plan review.']
    ]
  }
  const industryScenarios = scenarios[industry.id]
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const scenario = industryScenarios[scenarioIndex % industryScenarios.length]
  const correctCount = activity.options.filter((option, index) => option.correct === activitySelection.includes(index)).length
  const allActivityAnswersCorrect = correctCount === activity.options.length
  useEffect(() => {
    setActivitySelection([])
    setActivitySubmitted(false)
    setScenarioChoice(null)
    setScenarioIndex(0)
    setModule(0)
    setLesson(0)
    setLessonChoice(null)
    setTab('hazards')
  }, [industry.id])
  const toggleActivityOption = (index: number) => {
    setActivitySubmitted(false)
    setActivitySelection(selected => selected.includes(index) ? selected.filter(value => value !== index) : [...selected, index])
  }
  return <section className="section page"><div className="container">
    <Link className="text" to="/training">← All pathways</Link>
    <div className="pathway-hero" id="introduction"><div><p className="eyebrow">{industry.label}</p><h1>{industry.title}</h1><p className="lead">{industry.description}</p><p className="course-duration">{profile.duration}</p><button className="button" onClick={markExplored}><Check size={15}/> Mark pathway explored</button></div><img src={industry.image} alt={`${industry.title} workplace`}/></div>
    <nav className="course-section-nav" aria-label="Course sections">{courseSectionLinks.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <section className="workplace-gallery" aria-label={`${industry.title} workplace photos`}><p className="eyebrow">In the work environment</p><div className="workplace-gallery-grid">{industry.photos.map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption>{photo.caption}</figcaption></figure>)}</div></section>
    <section className="lesson-section course-section" id="needs-analysis"><p className="eyebrow">Needs Analysis · {industry.title}</p><h2>{sourceDetails[industry.id].title}</h2><div className="source-detail-grid">{sourceDetails[industry.id].sections.map(section => <article key={section.title}><h3>{section.title}</h3><p>{section.text}</p></article>)}</div></section>
    <section className="lesson-section course-section" id="target-audience"><p className="eyebrow">Target Audience</p><h2>Roles, responsibilities and learning needs.</h2><div className="course-card-grid">{profile.audience.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>
    <section className="lesson-section course-section" id="training-methods"><p className="eyebrow">Training Methods</p><h2>A blended approach that fits the work.</h2><p className="lead">{profile.methodFit}</p>{industry.id === 'forestry' || industry.id === 'mining' || industry.id === 'utilities' ? <p className="program-duration-note">The rural program’s source delivery model includes 2 hours of in-class instruction, a 30–40 minute mobile component, a 45-minute VR simulation and 4 hours of hands-on field drills. Practical activities require appropriate procedures and qualified supervision.</p> : null}<div className="method-table"><div className="method-row method-head"><b>Method</b><b>How it works</b><b>Benefits</b><b>Limitations</b></div>{methods.map(row => <div className="method-row" key={row[0]}>{row.map((cell, index) => index === 0 ? <b key={cell}>{cell}</b> : <span key={cell}>{cell}</span>)}</div>)}</div></section>
    <section className="lesson-section course-section" id="objectives-design"><p className="eyebrow">Objectives and Design</p><h2>Clear outcomes guide each pathway.</h2><div className="course-card-grid">{profile.objectives.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div><p className="program-duration-note">Targets are intended to be measured during delivery; they are not claims of results already achieved. The site uses clear navigation, visual learning, interactive feedback, mobile layouts and concise content to support accessible, lower-bandwidth use. English/French layout readiness does not mean translations are included.</p></section>
    <section className="lesson-section course-section" id="training-module"><p className="eyebrow">Training Module · {industry.title}</p><h2>{industry.id === 'high-rise' ? 'Four complete lessons' : 'A distinct four-module sequence'}</h2><p className="lead">Work through the lessons and scenarios before reviewing suggested responses. Website activities support awareness and do not replace site orientation or qualified practical training.</p>
      {industry.id === 'high-rise' && <><div className="lesson-tabs">{highRiseLessons.map((item, index) => <button className={lesson === index ? 'active' : ''} key={item.title} onClick={() => { setLesson(index); setLessonChoice(null) }}>Lesson {index + 1}</button>)}</div><article className="lesson-card"><p className="lesson-number">Lesson {lesson + 1} of 4</p><h2>{hLesson.title}</h2><p>{hLesson.intro}</p><ul className="check-list">{hLesson.points.map(point => <li key={point}><CircleCheck size={17}/>{point}</li>)}</ul><div className="knowledge-check"><b>Knowledge check</b><h3>{hLesson.check.question}</h3><div className="option-grid">{hLesson.check.options.map((option, index) => <button className={lessonChoice !== null ? index === hLesson.check.answer ? 'correct' : index === lessonChoice ? 'incorrect' : '' : ''} key={option} onClick={() => lessonChoice === null && setLessonChoice(index)}>{option}{lessonChoice !== null && index === hLesson.check.answer && <Check size={16}/>}</button>)}</div>{lessonChoice !== null && <div className="feedback"><strong>{lessonChoice === hLesson.check.answer ? 'Correct.' : 'Review this choice.'}</strong><p>{hLesson.check.explanation}</p></div>}</div></article></>}
      {pathwayData.length > 0 && <><div className="lesson-tabs">{pathwayData.map((item, index) => <button className={module === index ? 'active' : ''} key={item.title} onClick={() => setModule(index)}>Module {index + 1}</button>)}</div><article className="lesson-card"><p className="lesson-number">Module {module + 1} of 4</p><h2>{pathwayModule.title}</h2>{pathwayModule.intro && <p>{pathwayModule.intro}</p>}<ul className="check-list">{pathwayModule.points.map(point => <li key={point}><CircleCheck size={17}/>{point}</li>)}</ul>{pathwayModule.noLive && <p className="disclaimer">{pathwayModule.noLive} Specialist suppression is outside this awareness scope.</p>}</article></>}
      {industry.id === 'forestry' && <article className="panel forest-video-resource" aria-labelledby="forest-video-title"><p className="eyebrow">Additional visual training activity</p><h3 id="forest-video-title">360° Forest View</h3><p>Drag or swipe within the video to look around the forest scene. Pause to discuss how crews maintain orientation and communicate their location in a forest work area.</p><div className="youtube-embed"><iframe src="https://www.youtube-nocookie.com/embed/8AJ74-8AYv8" title="360° Forest View training video" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; web-share" allowFullScreen/></div><p className="video-fallback"><a className="text" href="https://youtu.be/8AJ74-8AYv8?si=TVXQMCvu8ABb18g8" target="_blank" rel="noreferrer">Open 360° Forest View on YouTube <ArrowRight size={14}/></a></p></article>}
      {industry.id === 'new-build' && <article className="topic-library"><p className="eyebrow">Additional focused topics</p><h3>Construction fire-safety catalogue</h3><p>Use these topics for follow-up lessons, toolbox talks or supervised practice.</p><div className="topic-chips">{newBuildTopicLibrary.map(topic => <span key={topic}>{topic}</span>)}</div></article>}
      <article className="hazard-activity"><div><p className="eyebrow">Image-based hazard activity</p><h3>Look closely. Choose every relevant check.</h3><p>{activity.prompt}</p><figure><img src={activity.image} alt={activity.alt} loading="lazy"/><figcaption>Use the worksite image as context for the scenario; apply your employer’s current procedures.</figcaption></figure></div><fieldset><legend>Select all that apply</legend>{activity.options.map((option, index) => <label className={activitySubmitted ? option.correct ? 'activity-correct' : activitySelection.includes(index) ? 'activity-incorrect' : '' : ''} key={option.label}><input type="checkbox" checked={activitySelection.includes(index)} disabled={activitySubmitted} onChange={() => toggleActivityOption(index)}/><span><b>{option.label}</b>{activitySubmitted && <small>{option.explanation}</small>}</span></label>)}<button className="button" disabled={!activitySelection.length || activitySubmitted} onClick={() => setActivitySubmitted(true)}>Check selections</button>{activitySubmitted && <p className="activity-result" role="status">{allActivityAnswersCorrect ? 'You identified all the relevant checks.' : `You matched ${correctCount} of ${activity.options.length} choices. Review the explanations and retry.`} { !allActivityAnswersCorrect && <button className="text" onClick={() => { setActivitySelection([]); setActivitySubmitted(false) }}>Try again</button>}</p>}</fieldset></article>
      {industry.id === 'mining' && <article className="panel video-resource"><p className="eyebrow">Captioned mining video lesson</p><h3>Recognizing Fire Hazards in Mining Operations</h3><video controls preload="metadata" aria-label="Recognizing Fire Hazards in Mining Operations"><source src={publicAsset('/recognizing-fire-hazards-mining-operations.mp4')} type="video/mp4"/>Your browser does not support HTML video.</video><a className="text" href={publicAsset('/recognizing-fire-hazards-mining-operations.mp4')} download>Download captioned MP4 <Download size={14}/></a></article>}
      <div className="tabs"><button className={tab === 'hazards' ? 'active' : ''} onClick={() => setTab('hazards')}>Understand hazards</button><button className={tab === 'prevention' ? 'active' : ''} onClick={() => setTab('prevention')}>Prevent the fire</button><button className={tab === 'emergency' ? 'active' : ''} onClick={() => setTab('emergency')}>Prepare to respond</button></div>
      <div className="two content"><article><p className="eyebrow">Notice / control / respond</p><h3>{tab === 'hazards' ? 'What can change the risk?' : tab === 'prevention' ? 'Controls must stay with the task.' : 'Know the first safe actions.'}</h3><ul className="check-list">{(tab === 'hazards' ? industry.hazards : tab === 'prevention' ? industry.prevention : [industry.emergency, 'Raise the alarm or notify using the established method', 'Do not investigate dangerous equipment or fight fires unless trained and authorized', 'Evacuate, account for workers and wait for re-entry authorization']).map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul></article><img className="pathway-photo" src={industry.image} alt=""/></div>
      <div className="scenario"><p className="eyebrow">Scenario practice · {scenarioIndex + 1}/{industryScenarios.length}</p><h3>Make the next decision.</h3><p>{scenario[0]}</p><div className="option-grid">{scenario[1].map((option, index) => <button className={scenarioChoice !== null ? index === scenario[2] ? 'correct' : index === scenarioChoice ? 'incorrect' : '' : ''} key={option} onClick={() => scenarioChoice === null && setScenarioChoice(index)}>{option}{scenarioChoice !== null && index === scenario[2] && <Check size={16}/>}</button>)}</div>{scenarioChoice !== null && <div className="feedback"><strong>{scenarioChoice === scenario[2] ? 'Good decision.' : 'Review this choice.'}</strong><p>{scenario[3]}</p><button className="text" onClick={() => { setScenarioChoice(null); setScenarioIndex(value => (value + 1) % industryScenarios.length) }}>Continue <ArrowRight size={14}/></button></div>}</div>
    </section>
    <section className="lesson-section course-section" id="evaluation-method"><p className="eyebrow">Evaluation Method</p><h2>Measure knowledge, application and improvement.</h2><div className="course-card-grid">{profile.evaluation.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div><p className="program-duration-note">Review Kirkpatrick’s four levels—reaction, learning, behaviour and results—alongside records and practical evidence. <Link className="text" to="/evaluation">Open the interactive evaluation and knowledge assessment <ArrowRight size={14}/></Link></p></section>
    <section className="lesson-section course-section" id="challenges-solutions"><p className="eyebrow">Challenges and Solutions</p><h2>Plan for real working conditions.</h2><div className="course-card-grid">{profile.challenges.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>
    <p className="disclaimer">FireReady is educational awareness. It does not replace employer-specific instruction, site procedures, legally required training, competent supervision, mine-rescue qualifications or specialist firefighting training.</p>
  </div></section>
}

function Evaluation() {
  const [answers, setAnswers] = useState(Array(assessment.length).fill(-1))
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useProgress()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const score = Math.round(assessment.reduce((n, q, i) => n + (answers[i] === q[2] ? 1 : 0), 0) / assessment.length * 100)
  return <section className="section page"><div className="container"><p className="eyebrow"><BarChart3 size={15}/> Evaluation</p><h1>Check understanding. Improve the next session.</h1><p className="lead">Use pre-training checks, lesson checks, final assessment, worker feedback and practical observations. A website quiz does not demonstrate practical competency.</p><div className="evaluation-layout"><div className="assessment"><h2>Integrated knowledge assessment · 80% to pass</h2><div className="progress"><span style={{ width: `${answers.filter(a => a >= 0).length / assessment.length * 100}%` }}/></div>{assessment.map((q, i) => <fieldset key={q[0]}><legend>{i + 1}. {q[0]}</legend>{q[1].map((option, n) => <label className={done ? n === q[2] ? 'correct' : answers[i] === n ? 'incorrect' : '' : ''} key={option}><input type="radio" checked={answers[i] === n} onChange={() => !done && setAnswers(a => a.map((v, k) => k === i ? n : v))}/>{option}</label>)}{done && <p className="assessment-feedback"><strong>{answers[i] === q[2] ? 'Correct.' : 'Review this choice.'}</strong> {q[3]}</p>}</fieldset>)}<button className="button" disabled={answers.includes(-1)} onClick={() => { setDone(true); setProgress(p => ({ ...p, score })) }}>Submit assessment</button>{done && <div className={score >= 80 ? 'result pass' : 'result'}><b>{score >= 80 ? 'PASS' : 'NOT YET PASSED'} · {score}%</b><p>Review the relevant lessons and retry. Rural program completion also requires all four modules, critical field-drill actions, and a separate retention assessment 5–7 days later.</p><button className="button ghost" onClick={() => { setDone(false); setAnswers(Array(assessment.length).fill(-1)) }}>Retry</button></div>}</div><aside><div className="score-card"><p className="eyebrow">Saved local score</p><strong>{progress.score === null ? '—' : `${progress.score}%`}</strong></div><div className="survey"><p className="eyebrow">Worker feedback</p><h2>Was the training clear?</h2><div className="stars">{[1,2,3,4,5].map(n => <button key={n} aria-label={`Rate ${n} out of 5`} onClick={() => setRating(n)}>{n <= rating ? '★' : '☆'}</button>)}</div><textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="What could be improved?"/><button className="text" onClick={() => setFeedback('Feedback saved locally. Thank you.')}>Save feedback <Check size={14}/></button></div></aside></div>
    <h2 className="section-title">Kirkpatrick's four levels</h2><div className="level-grid">{[['01 Reaction', 'Did participants find the training useful?'], ['02 Learning', 'Did participants gain knowledge in lesson and post checks?'], ['03 Behaviour', 'Are workers reporting hazards and following safe routes?'], ['04 Results', 'Has hazard reporting, awareness and preparedness improved?']].map(x => <article key={x[0]}><span>{x[0].slice(0,2)}</span><h3>{x[0].slice(3)}</h3><p>{x[1]}</p></article>)}</div>
  </div></section>
}

function Resources() {
  const [budget, setBudget] = useState([3000, 2500, 1500])
  const labels = ['Website development', 'Training materials', 'Delivery support']
  const total = budget.reduce((a, b) => a + b, 0)
  return <section className="section page"><div className="container"><p className="eyebrow"><Download size={15}/> Resources</p><h1>Tools for delivery and review.</h1><p className="lead">The source documents identify technical resources, legislation, a proposed pilot budget and recurring implementation challenges. The legal links below require current-version review.</p>
    <div className="two"><article className="panel"><p className="eyebrow">Resources required</p><h2>Delivery support</h2><ul className="check-list"><li><Check size={16}/>Computers, tablets or personal devices</li><li><Check size={16}/>Internet access or low-bandwidth and downloadable alternatives</li><li><Check size={16}/>Current site plans, emergency procedures and training materials</li><li><Check size={16}/>Qualified practical-demonstration support and approved PPE</li><li><Check size={16}/>Wildfire and air-quality information, communication cards and evacuation maps</li><li><Check size={16}/>Supervision, JHSC/employer support and completion records</li></ul></article><article className="panel"><p className="eyebrow">Practical evidence</p><h2>Observation and sign-off</h2><ul className="check-list"><li><Check size={16}/>Pre-training knowledge checks</li><li><Check size={16}/>Lesson quizzes and final assessment with explanations</li><li><Check size={16}/>Day 5–7 rural retention assessment</li><li><Check size={16}/>Practical field-drill and evacuation observations</li><li><Check size={16}/>Supervisor sign-offs and completion records</li></ul><p>Attendance is not proof of learning. Keep practical observations distinct from quiz scores.</p></article></div>
    <h2 className="section-title">Challenges and solutions</h2><div className="challenge-grid">{[['Cost constraints', 'Phase the pilot, share content and start with high-risk tasks.'], ['Time and scheduling', 'Use short micro-lessons, toolbox talks and coordinated drills.'], ['Remote connectivity', 'Provide low-bandwidth, downloadable and facilitated options.'], ['PPE and changing conditions', 'Use approved programs and reassess AQHI, weather and site controls.'], ['Different experience levels', 'Provide foundational lessons, role-specific content and supervisor follow-up.'], ['Limited construction time', 'Use short modules and focused demonstrations.'], ['Low participation', 'Connect examples to current site conditions and supervisor support.'], ['Language and technology barriers', 'Use plain language, visuals, bilingual-layout readiness and supported devices.'], ['Changing construction conditions', 'Review content against the current plan, routes and work stage.']].map(x => <article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div>
    <div className="budget-card"><p className="eyebrow">Source proposed pilot budget · illustrative</p><h2>$7,000 rural pilot framework</h2>{budget.map((value, i) => <label key={labels[i]}><span>{labels[i]}</span><input type="number" value={value} onChange={e => setBudget(b => b.map((v, n) => n === i ? Number(e.target.value) : v))}/></label>)}<strong>Adjusted total ${total.toLocaleString()}</strong></div>
    <div className="legal-card"><p className="eyebrow">References and current-version checks</p><h2>Canadian workplace and wildfire context</h2><p>Requirements depend on workplace type and jurisdiction. The supplied course material cites O. Reg. 207/96; Ontario regulations and protocols can change. This website is educational, not legal advice or a compliance certification. Verify current versions and site applicability with qualified personnel.</p><div className="legal-links"><a href="https://www.ontario.ca/laws/statute/90o01" target="_blank" rel="noreferrer">Ontario Occupational Health and Safety Act <ChevronRight size={14}/></a><a href="https://www.ontario.ca/laws/statute/90f24" target="_blank" rel="noreferrer">Forest Fires Prevention Act <ChevronRight size={14}/></a><a href="https://www.ontario.ca/laws/regulation/960207" target="_blank" rel="noreferrer">O. Reg. 207/96 – cited by course source <ChevronRight size={14}/></a><a href="https://www.ontario.ca/page/fire-intensity-codes-industrial-operations" target="_blank" rel="noreferrer">Ontario fire-intensity codes and industrial operations <ChevronRight size={14}/></a><a href="https://files.ontario.ca/mnrf-industrial-operations-protocol-2018-en-13-01-2020.pdf" target="_blank" rel="noreferrer">Industrial Operations Protocol (PDF) <ChevronRight size={14}/></a><a href="https://www.ontario.ca/laws/regulation/910213" target="_blank" rel="noreferrer">Construction Projects, O. Reg. 213/91 <ChevronRight size={14}/></a><a href="https://www.ontario.ca/laws/regulation/070213" target="_blank" rel="noreferrer">Ontario Fire Code <ChevronRight size={14}/></a><a href="https://www.ccohs.ca/" target="_blank" rel="noreferrer">Canadian Centre for Occupational Health and Safety <ChevronRight size={14}/></a><a href="https://www.wsib.ca/" target="_blank" rel="noreferrer">Workplace Safety and Insurance Board <ChevronRight size={14}/></a><a href="https://www.csagroup.org/" target="_blank" rel="noreferrer">CSA Z94.4 respiratory-protection standard information <ChevronRight size={14}/></a><a href="https://ciffc.ca/" target="_blank" rel="noreferrer">Canadian Interagency Forest Fire Centre <ChevronRight size={14}/></a><a href="https://www.ontario.ca/page/ministry-natural-resources" target="_blank" rel="noreferrer">Ontario Ministry of Natural Resources <ChevronRight size={14}/></a><a href="https://cwfis.cfs.nrcan.gc.ca/" target="_blank" rel="noreferrer">Canadian Wildland Fire Information System / CFFDRS and FWI <ChevronRight size={14}/></a><a href="https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index.html" target="_blank" rel="noreferrer">Government of Canada AQHI <ChevronRight size={14}/></a></div></div>
  </div></section>
}

function About() {
  return <section className="section page about"><div className="container"><p className="eyebrow">About Us</p><h1>About FireReady.</h1>
    <div className="about-copy">
      <article><h2>Who we are</h2><p>We are Derek, Sean, Jagraj, Marcus and Vidisha, Workplace Safety and Prevention students at Seneca Polytechnic. We developed FireReady for our Training Techniques and Practices course. Each team member studied a different workplace and built lessons around the decisions its crews face.</p></article>
      <article><h2>What we do</h2><p>We turn workplace situations into short lessons, crew discussions and knowledge checks. On a new build, you might decide what to do when a delivery blocks a stair. Underground, you might practice a radio report that gives mine control the exact level where you saw smoke. In both exercises, you explain what changed, who needs to know and what the site’s emergency plan calls for.</p></article>
      <article><h2>How to use FireReady</h2><p>Choose your workplace and open <strong>Training Module</strong> to begin. Try answering each scenario before reading the suggested response. For a toolbox talk, have one person give the report and another repeat back the location and concern. Then compare the exchange with your own workplace procedure.</p><p>For instructors and supervisors, each course also explains its target audience, training needs, learning objectives, teaching methods and evaluation approach. Use those sections to plan a discussion or decide what learners should demonstrate during supervised practice.</p></article>
    </div>
    <div className="about-workplaces" aria-label="FireReady workplace pathways">{industries.slice(0, 4).map(industry => <img key={industry.id} src={industry.photos[0].src} alt={industry.photos[0].alt} loading="lazy"/>)}</div>
  </div></section>
}
function App() { return <BrowserRouter basename={import.meta.env.BASE_URL}><Layout><Routes><Route path="/" element={<Home/>}/><Route path="/program" element={<Program/>}/><Route path="/training" element={<Training/>}/><Route path="/training/:id" element={<IndustryPage/>}/><Route path="/new-build" element={<IndustryPage fixedId="new-build"/>}/><Route path="/high-rise" element={<IndustryPage fixedId="high-rise"/>}/><Route path="/forestry" element={<IndustryPage fixedId="forestry"/>}/><Route path="/mining" element={<IndustryPage fixedId="mining"/>}/><Route path="/rural-utilities" element={<IndustryPage fixedId="utilities"/>}/><Route path="/evaluation" element={<Evaluation/>}/><Route path="/resources" element={<Resources/>}/><Route path="/about" element={<About/>}/><Route path="*" element={<Home/>}/></Routes></Layout></BrowserRouter> }

createRoot(document.getElementById('root')!).render(<App/>)
