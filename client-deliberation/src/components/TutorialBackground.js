import React, { useState, useEffect } from "react";
import { Box, Button } from "theme-ui";
import HexLogo from "./hexLogo";
import Title from "./Title";

import { MDXProvider } from "@theme-ui/mdx";
import IndividualDeliberationMD from "./IndividualDeliberationMD.mdx"
import IntegrateLink from "./IntegrateLink";
import IntegrateBox from "./IntegrateBox";
import IntegrateBoxAndConclusion from "./IntegrateBoxAndConclusion";


const TutorialBackground = (props) => {
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (props.currentIndex === 5 && !zoom) {
      setZoom(true); 
      setTimeout(() => {
        setZoom(false); 
      }, 500);
    }
  }, [props.currentIndex]);


  const headers = ["Competence in Client-Lawyer Relationship" ,"Scope of Representation and Allocation of Authority", "Explanation and Scenario Overview", "Confidentiality of Information", "Conflict of Interest: Current Client", "Conflict of Interest", "Duty to Former Clients", "Advisor", "Meritorious Claims and Contentions "]

  const heading_first = ["Example Scenario Involving layer Alex", "Lawyer-Client Decision-Making in Legal Representation", "Diligence - Client-Lawyer Relationship", "Primary Directive", "Example Scenario Involving layer Alex", "Lawyer-Client Decision-Making in Legal Representation", "Diligence - Client-Lawyer Relationship", "Primary Directive", "Example Scenario Involving layer Alex"] 

  const heading_second = ["Application and Consequences of Rule", "Lawyer-Client Authority and Representation Scope", "Questions and Consequences", "Application and Consequences of Rule", "Lawyer-Client Authority and Representation Scope", "Questions and Consequences", "Application and Consequences of Rule" ]

  const description_first = [
    'A lawyer is required to provide competent representation, which includes the necessary legal knowledge, skill, thoroughness, and preparation. This is essential in complex legal scenarios. Alex, a lawyer, is handling a challenging patent infringement case for a technology company. The case involves advanced technology and multiple patents, requiring specialized knowledge. These are key challenges for Alex:',
    'Model Rule 1.2 sets forth the principles guiding the lawyer-client relationship, focusing on decision-making authority and representation scope. Under this rule, a lawyer must comply with the clients decisions regarding the objectives of representation, provided they are within legal and ethical confines. This includes the clients prerogative in matters such as settling disputes or deciding on a trial strategy in criminal cases. The rule also permits lawyers to limit representation scope with informed client consent and forbids lawyers from assisting in illegal activities, while allowing discussion of legal consequences.',
    'A lawyer must work with reasonable diligence and promptness when representing a client.Scenario - Attorneys Handling of Case Deadlines: Attorney David is handling a complex civil litigation case for his client, Sarah. The case is challenging with multiple parties, complex legal issues, and lots of evidence. The court has set strict deadlines for discovery, motions, and trial preparation. David is also managing several other cases, leading to an overwhelming workload. The following issues are Arising: ',
    'The primary directive for lawyers regarding confidentiality is clear: a lawyer must not reveal any information related to the representation of a client. There are specific exceptions to this rule, which include situations where the client has given informed consent for the disclosure, cases where the disclosure is implicitly required to carry out the representation effectively, and circumstances where such disclosure is permitted by paragraph (b) of the relevant legal guidelines. The only Exceptions Allowing Disclosure are the following:', 
    'A lawyer is required to provide competent representation, which includes the necessary legal knowledge, skill, thoroughness, and preparation. This is essential in complex legal scenarios. Alex, a lawyer, is handling a challenging patent infringement case for a technology company. The case involves advanced technology and multiple patents, requiring specialized knowledge. These are key challenges for Alex:',
    'Model Rule 1.2 sets forth the principles guiding the lawyer-client relationship, focusing on decision-making authority and representation scope. Under this rule, a lawyer must comply with the clients decisions regarding the objectives of representation, provided they are within legal and ethical confines. This includes the clients prerogative in matters such as settling disputes or deciding on a trial strategy in criminal cases. The rule also permits lawyers to limit representation scope with informed client consent and forbids lawyers from assisting in illegal activities, while allowing discussion of legal consequences.',
    'A lawyer must work with reasonable diligence and promptness when representing a client.Scenario - Attorneys Handling of Case Deadlines: Attorney David is handling a complex civil litigation case for his client, Sarah. The case is challenging with multiple parties, complex legal issues, and lots of evidence. The court has set strict deadlines for discovery, motions, and trial preparation. David is also managing several other cases, leading to an overwhelming workload. The following issues are Arising: ',
    'The primary directive for lawyers regarding confidentiality is clear: a lawyer must not reveal any information related to the representation of a client. There are specific exceptions to this rule, which include situations where the client has given informed consent for the disclosure, cases where the disclosure is implicitly required to carry out the representation effectively, and circumstances where such disclosure is permitted by paragraph (b) of the relevant legal guidelines. The only Exceptions Allowing Disclosure are the following:',
    'A lawyer is required to provide competent representation, which includes the necessary legal knowledge, skill, thoroughness, and preparation. This is essential in complex legal scenarios. Alex, a lawyer, is handling a challenging patent infringement case for a technology company. The case involves advanced technology and multiple patents, requiring specialized knowledge. These are key challenges for Alex:'
  ]

  const description_second = [
    'According to the American Bar Associations Model Rule 1.1, lawyers must ensure competent representation. If Alex fails to meet these standards, the repercussions could include:',
    'In a scenario where Attorney Emily represents Mark in a personal injury lawsuit, the application of Model Rule 1.2 becomes crucial. The case illustrates a conflict between Marks desire for a substantial trial and Emilys professional opinion favoring a settlement. Here, Emily must balance respecting Marks autonomy with her obligation to offer competent advice. She is faced with questions about overriding Mark’s decision, adhering to a potentially less beneficial trial strategy, ensuring Mark is fully informed, and considering whether to continue representation if Marks choices might harm his case. Emilys challenge is to navigate these issues while complying with Model Rule 1.2. Non-compliance could lead to ethical complaints, legal malpractice claims, disciplinary actions, and reputational damage. Therefore, Emilys approach should involve transparent and effective communication with Mark to ensure decisions align with his best interests and professional ethical standards.', 
    'This rule requires lawyers like David to be diligent and prompt. They must not neglect a legal matter entrusted to them. Failing to following this Rule can lead to:',
    'Attorney Michael is in a challenging situation, representing a high-profile politician charged with serious offenses, a case that has drawn intense interest from the media. The journalists are aggressively seeking insider information, but Michael is concurrently facing the stringent demand for confidentiality from his client. This creates an ethical dilemma where he must carefully balance the pressure from media inquiries against his duty to maintain client confidentiality as mandated by Rule 1.6. In navigating this complex scenario, several key questions emerge for Michael to consider, including how to manage the medias requests without compromising the confidential nature of the information entrusted to him by his client. This leads to the following Consequences of Rule Violation:',
    'According to the American Bar Associations Model Rule 1.1, lawyers must ensure competent representation. If Alex fails to meet these standards, the repercussions could include:',
    'In a scenario where Attorney Emily represents Mark in a personal injury lawsuit, the application of Model Rule 1.2 becomes crucial. The case illustrates a conflict between Marks desire for a substantial trial and Emilys professional opinion favoring a settlement. Here, Emily must balance respecting Marks autonomy with her obligation to offer competent advice. She is faced with questions about overriding Mark’s decision, adhering to a potentially less beneficial trial strategy, ensuring Mark is fully informed, and considering whether to continue representation if Marks choices might harm his case. Emilys challenge is to navigate these issues while complying with Model Rule 1.2. Non-compliance could lead to ethical complaints, legal malpractice claims, disciplinary actions, and reputational damage. Therefore, Emilys approach should involve transparent and effective communication with Mark to ensure decisions align with his best interests and professional ethical standards.', 
    'This rule requires lawyers like David to be diligent and prompt. They must not neglect a legal matter entrusted to them. Failing to following this Rule can lead to:',
    'Attorney Michael is in a challenging situation, representing a high-profile politician charged with serious offenses, a case that has drawn intense interest from the media. The journalists are aggressively seeking insider information, but Michael is concurrently facing the stringent demand for confidentiality from his client. This creates an ethical dilemma where he must carefully balance the pressure from media inquiries against his duty to maintain client confidentiality as mandated by Rule 1.6. In navigating this complex scenario, several key questions emerge for Michael to consider, including how to manage the medias requests without compromising the confidential nature of the information entrusted to him by his client. This leads to the following Consequences of Rule Violation:',
    'According to the American Bar Associations Model Rule 1.1, lawyers must ensure competent representation. If Alex fails to meet these standards, the repercussions could include:',
  ]


  const list_items_first =  [
    [
    "Technical Complexity: Alex lacks the specific technological expertise needed for understanding patent claims and prior art.",
    "Limited Experience in Patent Law: Alex's background is mainly in corporate law, which doesn't fully equip them for the specific demands of patent law.",
    "Resource Constraints: The firm where Alex works is limited in technical experts and patent attorneys, affecting the quality of case preparation.",
    "Rapidly Evolving Technology: Constant advancements in the relevant technology field may impact the case's outcomes.",
    "Difficulty in Legal Research and Document Review: Alex is struggling with conducting thorough legal research in patent law and understanding a vast array of technical documents."
    ],
    [
        "In a personal injury case scenario, Attorney Emily represents Mark, where they face a conflict over whether to settle or go to trial. Emily, adhering to professional ethics, must balance respecting Mark’s autonomy with her duty to offer competent advice. This involves advising him about the potential risks and benefits of each option. The rule permits Emily to suggest a compromise, like preparing for trial while exploring settlement options.",
        "Non-compliance with Model Rule 1.2 can lead to ethical complaints, legal malpractice claims, professional discipline, and reputational damage. Hence, Emily must effectively communicate with Mark, ensuring decisions are made collaboratively, aligning with both ethical standards and Mark’s best interests."
    ],
    [
        "Overwhelming Caseload: Juggling multiple cases, David struggles to devote enough time to each, including Sarah's.",
        "Missed Deadlines: David's heavy workload leads him to miss a critical motion deadline in Sarah's case, potentially harming her legal standing.",
        "Lack of Preparation: Due to insufficient time, David is poorly prepared for depositions and court appearances, affecting his quality of representation."
    ],
    [
        "To prevent certain death or serious injury.",
        "To prevent client-involved crimes or frauds that harm others' financial interests or property, if the lawyer's services are being used.",
        "To prevent, mitigate, or rectify substantial harm to others' financial interests or property due to the client's crime or fraud, where the lawyer's services were used.",
        "To get legal advice about complying with these rules.",
        "To establish claims or defenses in legal disputes involving the lawyer and the client, or if the lawyer faces charges related to the client's actions.",
        "To obey laws or court orders.",
        "To manage conflicts of interest related to changes in employment or law firm structure, without harming attorney-client privilege."
    ],
    [
        "Technical Complexity: Alex lacks the specific technological expertise needed for understanding patent claims and prior art.",
        "Limited Experience in Patent Law: Alex's background is mainly in corporate law, which doesn't fully equip them for the specific demands of patent law.",
        "Resource Constraints: The firm where Alex works is limited in technical experts and patent attorneys, affecting the quality of case preparation.",
        "Rapidly Evolving Technology: Constant advancements in the relevant technology field may impact the case's outcomes.",
        "Difficulty in Legal Research and Document Review: Alex is struggling with conducting thorough legal research in patent law and understanding a vast array of technical documents."
    ],
    [
        "In a personal injury case scenario, Attorney Emily represents Mark, where they face a conflict over whether to settle or go to trial. Emily, adhering to professional ethics, must balance respecting Mark’s autonomy with her duty to offer competent advice. This involves advising him about the potential risks and benefits of each option. The rule permits Emily to suggest a compromise, like preparing for trial while exploring settlement options.",
        "Non-compliance with Model Rule 1.2 can lead to ethical complaints, legal malpractice claims, professional discipline, and reputational damage. Hence, Emily must effectively communicate with Mark, ensuring decisions are made collaboratively, aligning with both ethical standards and Mark’s best interests."
    ],
    [
        "Overwhelming Caseload: Juggling multiple cases, David struggles to devote enough time to each, including Sarah's.",
        "Missed Deadlines: David's heavy workload leads him to miss a critical motion deadline in Sarah's case, potentially harming her legal standing.",
        "Lack of Preparation: Due to insufficient time, David is poorly prepared for depositions and court appearances, affecting his quality of representation."
    ],
    [
        "To prevent certain death or serious injury.",
        "To prevent client-involved crimes or frauds that harm others' financial interests or property, if the lawyer's services are being used.",
        "To prevent, mitigate, or rectify substantial harm to others' financial interests or property due to the client's crime or fraud, where the lawyer's services were used.",
        "To get legal advice about complying with these rules.",
        "To establish claims or defenses in legal disputes involving the lawyer and the client, or if the lawyer faces charges related to the client's actions.",
        "To obey laws or court orders.",
        "To manage conflicts of interest related to changes in employment or law firm structure, without harming attorney-client privilege."
    ],
    [
        "Technical Complexity: Alex lacks the specific technological expertise needed for understanding patent claims and prior art.",
        "Limited Experience in Patent Law: Alex's background is mainly in corporate law, which doesn't fully equip them for the specific demands of patent law.",
        "Resource Constraints: The firm where Alex works is limited in technical experts and patent attorneys, affecting the quality of case preparation.",
        "Rapidly Evolving Technology: Constant advancements in the relevant technology field may impact the case's outcomes.",
        "Difficulty in Legal Research and Document Review: Alex is struggling with conducting thorough legal research in patent law and understanding a vast array of technical documents."
        ],
  ]

  const list_items_second = [
    [
        "Sanctions: The court might impose penalties for not fulfilling the duty of competence.",
        "Malpractice Claims: The client could allege that Alex's inadequate representation led to financial damages.",
        "Damage to Professional Reputation: Inadequate handling of the case could harm Alex's reputation, affecting future work opportunities.",
        "Potential Remedial Actions: The court may allow Alex to take corrective steps, such as partnering with a patent attorney, to better handle the case."
    ],
    [],
    [
        "Ethical Complaint: Sarah might complain about David neglecting her case.",
        "Legal Malpractice Claims: Sarah could sue David for damages if her case suffers due to his negligence.",
        "Professional Discipline: The legal authority may discipline David if he's found violating this Rule.",
        "Reputation Damage: David’s professional reputation could suffer from allegations of not meeting his ethical duties. "
    ],
    [
        "Ethical Complaints: Unauthorized disclosures could lead to complaints.",
        "Legal Liability: Accidental disclosures in media interviews could result in legal action.",
        "Professional Discipline: The bar association may investigate and discipline Michael for breaches.",
        "Reputation Damage: Public allegations can harm Michael’s professional standing."
    ],
    [
        "Sanctions: The court might impose penalties for not fulfilling the duty of competence.",
        "Malpractice Claims: The client could allege that Alex's inadequate representation led to financial damages.",
        "Damage to Professional Reputation: Inadequate handling of the case could harm Alex's reputation, affecting future work opportunities.",
        "Potential Remedial Actions: The court may allow Alex to take corrective steps, such as partnering with a patent attorney, to better handle the case."
    ],
    [],
    [
        "Ethical Complaint: Sarah might complain about David neglecting her case.",
        "Legal Malpractice Claims: Sarah could sue David for damages if her case suffers due to his negligence.",
        "Professional Discipline: The legal authority may discipline David if he's found violating this Rule.",
        "Reputation Damage: David’s professional reputation could suffer from allegations of not meeting his ethical duties. "
    ],
    [
        "Ethical Complaints: Unauthorized disclosures could lead to complaints.",
        "Legal Liability: Accidental disclosures in media interviews could result in legal action.",
        "Professional Discipline: The bar association may investigate and discipline Michael for breaches.",
        "Reputation Damage: Public allegations can harm Michael’s professional standing."
    ],
    [
        "Sanctions: The court might impose penalties for not fulfilling the duty of competence.",
        "Malpractice Claims: The client could allege that Alex's inadequate representation led to financial damages.",
        "Damage to Professional Reputation: Inadequate handling of the case could harm Alex's reputation, affecting future work opportunities.",
        "Potential Remedial Actions: The court may allow Alex to take corrective steps, such as partnering with a patent attorney, to better handle the case."
    ],
  ];

  const conclusion = [
    'Adhering to the duty of competence under Model Rule 1.1 is fundamental in law practice, especially in specialized fields like patent law. Lawyers need to recognize their limitations and acquire necessary expertise or collaborate with experts to prevent negative impacts on both themselves and their clients.',
    '',
    'This Rule highlights the need for lawyers to be diligent and timely. In this scenario, Davids heavy caseload leads to missing a crucial deadline, jeopardizing Sarahs case. To adhere to Rule 1.3, David should manage his workload better, allocate enough time to each case, and address any lapses in his service promptly.',
    'Priority on Confidentiality: Michael must be cautious in media interactions, avoid disclosing confidential information, and focus on protecting his client’s privacy and interests. Compliance with Rule 1.6 is crucial to his professional integrity and client trust.',
    'Adhering to the duty of competence under Model Rule 1.1 is fundamental in law practice, especially in specialized fields like patent law. Lawyers need to recognize their limitations and acquire necessary expertise or collaborate with experts to prevent negative impacts on both themselves and their clients.',
    '',
    'This Rule highlights the need for lawyers to be diligent and timely. In this scenario, Davids heavy caseload leads to missing a crucial deadline, jeopardizing Sarahs case. To adhere to Rule 1.3, David should manage his workload better, allocate enough time to each case, and address any lapses in his service promptly.',
    'Priority on Confidentiality: Michael must be cautious in media interactions, avoid disclosing confidential information, and focus on protecting his client’s privacy and interests. Compliance with Rule 1.6 is crucial to his professional integrity and client trust.',
    'Adhering to the duty of competence under Model Rule 1.1 is fundamental in law practice, especially in specialized fields like patent law. Lawyers need to recognize their limitations and acquire necessary expertise or collaborate with experts to prevent negative impacts on both themselves and their clients.',
  ]


  const videoStyles = {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
    transform: zoom ? 'scale(1.2)' : 'scale(1)',
    transition: 'transform 0.5s',
  };

  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      <HexLogo />
      <Title value={headers[props.currentIndex]} />
      
      <div style={{...videoStyles, display: 'flex', justifyContent: 'center', margin: '20px'}}>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/R9OHn5ZF4Uo?si=7z2akiELGhjCaO1R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      
      <IntegrateBox heading={heading_first[props.currentIndex]} description={description_first[props.currentIndex]} items={list_items_first[props.currentIndex]}></IntegrateBox>


      <IntegrateBoxAndConclusion heading={heading_second[props.currentIndex]} description={description_second[props.currentIndex]} items={list_items_second[props.currentIndex]} conclusion={conclusion[props.currentIndex]}></IntegrateBoxAndConclusion>
    </Box>
  );
};

export default TutorialBackground;
