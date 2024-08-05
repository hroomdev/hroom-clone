import { getAIAdvices, saveAIAdvice } from './app/server/dashboardai'

import { updateCacheData } from './app/server/dashboarddbcache'

//import { saveAIAdvice } from './app/server/'
var promt1 = `employee_id,department_id,hire_date,is_anonymous
4,13,2024-07-15,true
2,11,2024-07-20,true
3,10,2024-07-19,true
1,7,2024-07-22,true`

var promt2 = `statistic_id,survey_id,employee_id,engagement_score,satisfaction_score,loyalty_score,total_answers,negative_responses
62,18,2,2.65,3,2,20,0
63,18,2,2.8583333333333334,5.666666666666666,9.5,20,0
64,18,2,2.533333333333333,2.6666666666666665,8,20,0
65,18,2,2.8,5,2,20,0
66,18,2,2.525,5,5,20,0
67,18,2,2.0583333333333336,6.666666666666667,2.5,20,0
68,18,2,2.9083333333333337,6.666666666666667,10,20,0
69,18,2,2.85,7,7,20,0
70,18,2,3.075,7.000000000000001,7,20,0
71,18,2,2.825,4,6,20,0`

var promt3 = `survey_id,start_date,survey_name,end_date
1, 2024-07-27 23:22:23.679,a,2024-07-29 23:22:23.679
15,2024-07-28 23:22:23.679,aa,2024-07-30 23:22:23.679
16,2024-07-28 23:55:38.512,aaa,2024-07-30 23:55:38.512
17,2024-07-28 23:59:39.001,aaaa,2024-07-30 23:59:39.001
18,2024-07-29 00:01:17.169,aaaaa,2024-07-31 00:01:17.169
19,2024-07-30 13:31:54.174,aaaaaa,2024-07-31 13:31:54.174
20,2024-07-30 13:31:55.474,aaaaaaa,2024-07-31 13:31:55.474
21,2024-07-30 13:32:31.479,aaaaaaaa,2024-07-31 13:32:31.479
22,2024-07-30 13:44:44.547,aaaaaaaaa,2024-07-31 13:44:44.547
23,2024-07-30 13:49:03.366,aaaaaaaaaa,2024-07-31 13:49:03.366
24,2024-07-30 13:49:24.079,aaaaaaaaaaa,2024-07-31 13:49:24.079`

var promt4 = `question_id,created_at,Metric,Sub Metric,Type,question_text
1,2024-07-16 14:22:41.57694,Recognition,Recognition Quality,,My organization encourages team members to give recognition to one another.
2,2024-07-16 14:22:41.57694,Recognition,Recognition Quality,,I receive meaningful recognition.
3,2024-07-16 14:22:41.57694,Recognition,Recognition Quality,dots5,If I do great work  I know that it will be recognized.
4,2024-07-16 14:22:41.57694,Recognition,Recognition Quality,,Continuous recognition is provided in my organization.
5,2024-07-16 14:22:41.57694,Recognition,Recognition Frequency,dots5,I am happy with how frequently I am recognized.
6,2024-07-16 14:22:41.57694,Recognition,Recognition Frequency,,Recognition is given in a timely fashion.
7,2024-07-16 14:22:41.57694,Recognition,Recognition Frequency,,How would you rate the frequency at which you receive recognition?
8,2024-07-16 14:22:41.57694,Ambassadorship,Pride,,I am proud of what my organization stands for.
9,2024-07-16 14:22:41.57694,Ambassadorship,Pride,,When you say what organization you work for  how do you feel?
10,2024-07-16 14:22:41.57694,Ambassadorship,Pride,dots5,I am proud of the value we create as an organization.
11,2024-07-16 14:22:41.57694,Ambassadorship,Championing,,On a scale from 0-10  how likely are you to recommend your organization as a good place to work?
12,2024-07-16 14:22:41.57694,Ambassadorship,Championing,,On a scale from 0-10  how likely are you to recommend the products/services your organization makes?
13,2024-07-16 14:22:41.57694,Ambassadorship,Championing,,I consider myself an ambassador for my organization.
14,2024-07-16 14:22:41.57694,Ambassadorship,Championing,slider10-4,"If you were in charge of the ""best places to work"" awards  would you nominate your organization?"
15,2024-07-16 14:22:41.57694,Ambassadorship,Championing,,On a scale from 0-10  how likely is it that you would stay with [Luxclusif] if you were offered a similar job elsewhere?
16,2024-07-16 14:22:41.57694,Feedback,Feedback Quality,,The feedback I receive helps me grow and develop.
17,2024-07-16 14:22:41.57694,Feedback,Feedback Quality,,When someone gives me feedback at work  it's done in a respectful way.
18,2024-07-16 14:22:41.57694,Feedback,Feedback Quality,,On a scale from 0-10  how valuable is the feedback you receive?
19,2024-07-16 14:22:41.57694,Feedback,Feedback Quality,image-feedback,Is the feedback you get specific?
20,2024-07-16 14:22:41.57694,Feedback,Feedback Frequency,dots5,I am satisfied with the frequency of feedback coming from my peers.
21,2024-07-16 14:22:41.57694,Feedback,Feedback Frequency,,Are you satisfied with the frequency of feedback coming from your direct manager?
22,2024-07-16 14:22:41.57694,Feedback,Feedback Frequency,,Which of the following best describes the amount of feedback you typically get regarding your work?
23,2024-07-16 14:22:41.57694,Feedback,Feedback Frequency,,"The feedback I receive is frequent enough to help me understand how I can improve. "
24,2024-07-16 14:22:41.57694,Feedback,Suggestions for the Organization,,I feel like I can voice my opinion regarding my organization.
25,2024-07-16 14:22:41.57694,Feedback,Suggestions for the Organization,,Team members are encouraged to be innovative even though some initiatives may not succeed.
26,2024-07-16 14:22:41.57694,Feedback,Suggestions for the Organization,,How would you rate the importance that your organization gives to your opinions and suggestions?
27,2024-07-16 14:22:41.57694,Feedback,Suggestions for the Organization,,On a scale from 0-10  if you have new ideas for your organization  what are the chances that you will share them?
28,2024-07-16 14:22:41.57694,Feedback,Suggestions for the Organization,,My organization takes suggestions from team members into consideration.
29,2024-07-16 14:22:41.57694,Relationship with Peers,Collaboration between Peers,,I feel like I am part of a team.
30,2024-07-16 14:22:41.57694,Relationship with Peers,Collaboration between Peers,,Do you and your peers collaborate well together?
31,2024-07-16 14:22:41.57694,Relationship with Peers,Collaboration between Peers,,Collaboration with peers from other teams is positive.
32,2024-07-16 14:22:41.57694,Relationship with Peers,Collaboration between Peers,,I feel that every member of our team contributes to our team goals.
33,2024-07-16 14:22:41.57694,Relationship with Peers,Collaboration between Peers,,In our team  we hold each other accountable for results.
34,2024-07-16 14:22:41.57694,Relationship with Peers,Trust between Peers,,My peers are committed to doing quality work.
35,2024-07-16 14:22:41.57694,Relationship with Peers,Trust between Peers,,On a scale from 0-10  how much do you trust your peers?
36,2024-07-16 14:22:41.57694,Relationship with Peers,Trust between Peers,,Do you respect the people you work with?
37,2024-07-16 14:22:41.57694,Relationship with Peers,Trust between Peers,,I feel safe to be myself with my peers.
38,2024-07-16 14:22:41.57694,Relationship with Peers,Trust between Peers,dots5,My peers demonstrate competency in their roles.
39,2024-07-16 14:22:41.57694,Relationship with Peers,Communication between Peers,scale10,On a scale from 0-10  how satisfied are you with the frequency at which you communicate with your peers at work?
40,2024-07-16 14:22:41.57694,Relationship with Peers,Communication between Peers,,My peers and I have open discussions in which everyone's opinion counts.
41,2024-07-16 14:22:41.57694,Relationship with Peers,Communication between Peers,,Do communications among peers feel honest?
42,2024-07-16 14:22:41.57694,Relationship with Manager,Collaboration with Manager,,My direct manager cares about my opinion.
43,2024-07-16 14:22:41.57694,Relationship with Manager,Collaboration with Manager,,What is it like working with your direct manager?
44,2024-07-16 14:22:41.57694,Relationship with Manager,Collaboration with Manager,,My direct manager takes accountability for our team's results.
45,2024-07-16 14:22:41.57694,Relationship with Manager,Collaboration with Manager,slider10-2,My direct manager gives me the support I need in my work.
46,2024-07-16 14:22:41.57694,Relationship with Manager,Trust with Manager,,My direct manager is someone I can trust.
47,2024-07-16 14:22:41.57694,Relationship with Manager,Trust with Manager,,My direct manager cares about my well-being.
48,2024-07-16 14:22:41.57694,Relationship with Manager,Trust with Manager,,My direct manager treats me with respect.
49,2024-07-16 14:22:41.57694,Relationship with Manager,Trust with Manager,,I feel that my direct manager does a good job managing people.
50,2024-07-16 14:22:41.57694,Relationship with Manager,Trust with Manager,dots5,I feel that my direct manager understands my day-to-day reality.
51,2024-07-16 14:22:41.57694,Relationship with Manager,Communication with Manager,,On a scale from 0-10  how satisfied are you with how frequently you communicate with your direct manager?
52,2024-07-16 14:22:41.57694,Relationship with Manager,Communication with Manager,,My direct manager keeps me informed about what is happening in our organization.
53,2024-07-16 14:22:41.57694,Relationship with Manager,Communication with Manager,,I feel that my direct manager communicates honestly with me.
54,2024-07-16 14:22:41.57694,Relationship with Manager,Communication with Manager,,My direct manager creates opportunities for open discussion within our team.
55,2024-07-16 14:22:41.57694,Satisfaction,Fairness,,Do you believe that the way pay is decided in your organization is fair?
56,2024-07-16 14:22:41.57694,Satisfaction,Fairness,dots5,When I take into account my responsibilities  skills and experience  I believe I am paid fairly.
57,2024-07-16 14:22:41.57694,Satisfaction,Fairness,,Do you trust that you are paid fairly compared to similar roles in OTHER organizations?
58,2024-07-16 14:22:41.57694,Satisfaction,Fairness,,Do you trust that you are paid fairly compared to similar roles WITHIN your organization?
59,2024-07-16 14:22:41.57694,Satisfaction,Fairness,,My job performance is evaluated fairly.
60,2024-07-16 14:22:41.57694,Satisfaction,Fairness,,Poor performance is effectively addressed in our organization.
61,2024-07-16 14:22:41.57694,Satisfaction,Role within Organization,,Are your responsibilities clear?
62,2024-07-16 14:22:41.57694,Satisfaction,Role within Organization,,At work  I know what I’m expected to deliver.
63,2024-07-16 14:22:41.57694,Satisfaction,Role within Organization,,I feel that my individual goals are strongly aligned with our team goals.
64,2024-07-16 14:22:41.57694,Satisfaction,Role within Organization,,I revisit and discuss my goals at a frequency that makes sense for me.
65,2024-07-16 14:22:41.57694,Satisfaction,Role within Organization,slider10-2,I feel secure in my role and position here.
66,2024-07-16 14:22:41.57694,Satisfaction,Role within Organization,,My responsibilities are in line with my role.
67,2024-07-16 14:22:41.57694,Satisfaction,Work environment,,Does your work environment allow you to work distraction-free when you need to?
68,2024-07-16 14:22:41.57694,Satisfaction,Work environment,,"Are you comfortable in your work environment? "
69,2024-07-16 14:22:41.57694,Satisfaction,Work environment,,How enjoyable is your work environment?
70,2024-07-16 14:22:41.57694,Satisfaction,Work environment,,Do you have all you need to do your work properly?
71,2024-07-16 14:22:41.57694,Satisfaction,Work environment,image-collab,Our organization enables people to collaborate easily  even if remote.
72,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,,I am inspired by the purpose and mission of my organization.
73,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,,The leaders of my organization have communicated a vision that motivates me.
74,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,,Does your organization invest an amount of resources  people and efforts that measures up to its ambitions?
75,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,dots5,The goals and strategies of my organization are taking us in the right direction.
76,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,,"Do you believe that your organization is able to reach its objectives? "
77,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,,Is your organization's long term vision clear to you?
78,2024-07-16 14:22:41.57694,Alignment,Vision & Mission,,My organization communicates in a clear and effective way with team members.
79,2024-07-16 14:22:41.57694,Alignment,Values,dots5,My organization's values are aligned with values I consider important in life.
80,2024-07-16 14:22:41.57694,Alignment,Values,,The way our organization makes decisions reflects our organization's values.
81,2024-07-16 14:22:41.57694,Alignment,Values,,On a scale from 0-10  how well are your organization's values reflected in how people behave at work?
82,2024-07-16 14:22:41.57694,Alignment,Values,,Does your team work in alignment with your organization's values?
83,2024-07-16 14:22:41.57694,Alignment,Ethics & Social Responsibility,,People are respected for who they are in my organization.
84,2024-07-16 14:22:41.57694,Alignment,Ethics & Social Responsibility,,"People from all backgrounds are treated fairly in my organization. "
85,2024-07-16 14:22:41.57694,Alignment,Ethics & Social Responsibility,,I see concrete actions that bring my organization's commitment to social responsibility to life.
86,2024-07-16 14:22:41.57694,Alignment,Ethics & Social Responsibility,,My organization values the uniqueness of its team members.
87,2024-07-16 14:22:41.57694,Alignment,Ethics & Social Responsibility,,My organization works to attract  develop  and retain people with diverse backgrounds.
88,2024-07-16 14:22:41.57694,Alignment,Ethics & Social Responsibility,,On a scale from 0-10  how welcome and included do you feel in your organization?
89,2024-07-16 14:22:41.57694,Happiness,Happiness at Work,,Do you enjoy the work you do?
90,2024-07-16 14:22:41.57694,Happiness,Happiness at Work,,Most days I feel a sense of accomplishment from what I do.
91,2024-07-16 14:22:41.57694,Happiness,Happiness at Work,,My work is fulfilling.
92,2024-07-16 14:22:41.57694,Happiness,Happiness at Work,stars5,Generally speaking  how would you rate your level of happiness at work?
93,2024-07-16 14:22:41.57694,Happiness,Work-Life Balance,,I feel that I can maintain a healthy balance between work and my personal life.
94,2024-07-16 14:22:41.57694,Happiness,Work-Life Balance,,I am supported by my organization if I need to make use of flexible working arrangements.
95,2024-07-16 14:22:41.57694,Happiness,Work-Life Balance,,Do you have the flexibility to take time off when you need to?
96,2024-07-16 14:22:41.57694,Happiness,Work-Life Balance,,I feel supported in my workplace when I am dealing with personal or family issues.
97,2024-07-16 14:22:41.57694,Happiness,Work-Life Balance,image-lifebalance,Have you noticed your work taking a toll on your personal life?
98,2024-07-16 14:22:41.57694,Wellness,Stress,,On a scale from 0-10  how reasonable is your workload?
99,2024-07-16 14:22:41.57694,Wellness,Stress,,"My organization offers the support I need to deal with work-related stress. "
100,2024-07-16 14:22:41.57694,Wellness,Stress,,Someone would say or do something helpful if I show signs of stress when working.
101,2024-07-16 14:22:41.57694,Wellness,Stress,slider10-1,Overall  how do you feel about your level of work-related stress?
102,2024-07-16 14:22:41.57694,Wellness,Stress,,I have a manageable stress level at work.
103,2024-07-16 14:22:41.57694,Wellness,Personal Health,,I feel physically safe where I am working.
104,2024-07-16 14:22:41.57694,Wellness,Personal Health,,On a scale from 0-10  how would you rate your organization's actions to promote wellness (support  resources for remote work or mental health  programs  etc.)?
105,2024-07-16 14:22:41.57694,Wellness,Personal Health,,My organization really cares about my mental well-being.
106,2024-07-16 14:22:41.57694,Wellness,Personal Health,,I am able to maintain a good level of energy at work.
107,2024-07-16 14:22:41.57694,Wellness,Personal Health,image-healthy-lifestyle,Do you feel that working for your organization allows you to have a healthy lifestyle?
108,2024-07-16 14:22:41.57694,Personal Growth,Autonomy,,I am appropriately involved in decisions that affect my work.
109,2024-07-16 14:22:41.57694,Personal Growth,Autonomy,,Do you feel you have enough freedom to decide how you do your work?
110,2024-07-16 14:22:41.57694,Personal Growth,Autonomy,,On a scale from 0-10  how satisfied are you with the level of autonomy you have at work?
111,2024-07-16 14:22:41.57694,Personal Growth,Autonomy,,I feel that I am in control when it comes to the work I need to accomplish.
112,2024-07-16 14:22:41.57694,Personal Growth,Autonomy,,Can you try new tools or new ideas that will help you do your work better?
113,2024-07-16 14:22:41.57694,Personal Growth,Mastery,,How would you rate the way your organization makes use of your strengths?
114,2024-07-16 14:22:41.57694,Personal Growth,Mastery,,On a scale from 0-10  how would you rate your level of access to relevant training?
115,2024-07-16 14:22:41.57694,Personal Growth,Mastery,,How would you describe the level of challenge you have at work?
116,2024-07-16 14:22:41.57694,Personal Growth,Mastery,,"Do you have the opportunity to grow within your organization? "
117,2024-07-16 14:22:41.57694,Personal Growth,Mastery,slider10-3,I am supported towards my growth and development.
118,2024-07-16 14:22:41.57694,Personal Growth,Mastery,,I have the opportunity to do what I do best in my role.
119,2024-07-16 14:22:41.57694,Personal Growth,Purpose,,I feel like my organization trusts me to contribute to our mission.
120,2024-07-16 14:22:41.57694,Personal Growth,Purpose,,Do you feel that your work has an impact on your organization's purpose?
121,2024-07-16 14:22:41.57694,Personal Growth,Purpose,,Can you see how your work contributes to your organization's objectives?
122,2024-07-16 14:22:41.57694,Personal Growth,Purpose,,I feel a strong sense of purpose related to my role here.`

export async function register() {
  //load db to cache dashboard
  console.log('register hook start')

  //var advice1 = await saveAIAdvice(promt1)

  //var advice2 = await saveAIAdvice(promt2)

  //var advice3 = await saveAIAdvice(promt3)

  //var advice4 = await saveAIAdvice(promt4)

  var advice4 = await saveAIAdvice('')

  console.log('register hook end' + advice4)

  //await updateCacheData()

  //var advices = await getAIAdvices('3')

  //for (var i = 0; i < advices.length; i++) {
  //  console.log('advice readed ' + advices[i])
  //}
}
