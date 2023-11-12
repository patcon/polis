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


  const headers = ["Competence in Client-Lawyer Relationship" ,"Scope of Representation and Allocation of Authority", "Diligence", "Confidentiality of Information", "Conflict of Interest: Current Client", "Conflict of Interest", "Duty to Former Clients", "Advisor", "Meritorious Claims and Contentions "]

  const heading_first = ["Example Scenario Involving layer Alex", "Lawyer-Client Decision-Making in Legal Representation", "Diligence - Client-Lawyer Relationship", "Primary Directive","Conflict of Interest: Current Clients", "General Principles of Conflict of Interest with Current Clients Specific", "Understanding Rule 1.9 - Duty to Former Clients", "Overview of Attorney's Duties", "Understanding Rule 3.1 - The Basic Principle",] 

  const heading_second = ["Application and Consequences of Rule", "Lawyer-Client Authority and Representation Scope", "Questions and Consequences", "Application to Example Attorney Lisa's Scenario","Handling Conflicts", "Analyzing Michael’s Situation: ", "Navigating Ethical Challenges and Consequences", "Application of Rule 2.1 and Potential Consequences", "Applying Rule 3.1 - Scenario Analysis", ]

  const description_first = [
    'A lawyer is required to provide competent representation, which includes the necessary legal knowledge, skill, thoroughness, and preparation. This is essential in complex legal scenarios. Alex, a lawyer, is handling a challenging patent infringement case for a technology company. The case involves advanced technology and multiple patents, requiring specialized knowledge. These are key challenges for Alex:',
    'Model Rule 1.2 sets forth the principles guiding the lawyer-client relationship, focusing on decision-making authority and representation scope. Under this rule, a lawyer must comply with the clients decisions regarding the objectives of representation, provided they are within legal and ethical confines. This includes the clients prerogative in matters such as settling disputes or deciding on a trial strategy in criminal cases. The rule also permits lawyers to limit representation scope with informed client consent and forbids lawyers from assisting in illegal activities, while allowing discussion of legal consequences.',
    'A lawyer must work with reasonable diligence and promptness when representing a client.Scenario - Attorneys Handling of Case Deadlines: Attorney David is handling a complex civil litigation case for his client, Sarah. The case is challenging with multiple parties, complex legal issues, and lots of evidence. The court has set strict deadlines for discovery, motions, and trial preparation. David is also managing several other cases, leading to an overwhelming workload. The following issues are Arising: ',
    'The primary directive for lawyers regarding confidentiality is clear: a lawyer must not reveal any information related to the representation of a client. There are specific exceptions to this rule, which include situations where the client has given informed consent for the disclosure, cases where the disclosure is implicitly required to carry out the representation effectively, and circumstances where such disclosure is permitted by paragraph (b) of the relevant legal guidelines. The only Exceptions Allowing Disclosure are the following:', 
    'General Prohibition: A lawyer must not represent a client if theres a concurrent conflict of interest, which occurs in two situations: Direct Adversity: When representing one client directly harms another client. Material Limitation: When a lawyers ability to represent a client is significantly limited due to responsibilities to another client, a former client, a third person, or the lawyers own interests. This leads to the following exceptions:',
    'Rule 1.8 of the American Bar Associations Model Rules of Professional Conduct focuses on conflicts of interest involving current clients, particularly when a lawyer has a financial interest adverse to a client. Key points include:',
    'Representation Restrictions: A lawyer cannot represent a new client in a matter that is the same or closely related to a matter of a former client if the interests of the new and former clients conflict, unless the former client consents in writing. Knowledge from Previous Firm: If a lawyer has moved firms, they must not represent a client in a matter that their former firm handled, which is also adverse to the interests of the former firms client, especially if the lawyer has confidential information from that time. This comes with some Potential Ethical Concerns:',
    'Rule 2.1 dictates that a lawyer, exemplified here by Attorney Sarah, is required to use independent judgment and offer honest advice to their client. This guidance isnt limited to legal considerations alone; it encompasses a broader spectrum, including moral, economic, social, and political factors that might be pertinent to the clients circumstances.',
    'Core Principle: Lawyers must not initiate or defend legal proceedings, or challenge or defend issues within those proceedings, unless they have a legitimate basis in law and fact. This basis must not be frivolous and should include good faith arguments for changing, modifying, or overturning existing law.',
    
  ]

  const description_second = [
    'According to the American Bar Associations Model Rule 1.1, lawyers must ensure competent representation. If Alex fails to meet these standards, the repercussions could include:',
    'In a scenario where Attorney Emily represents Mark in a personal injury lawsuit, the application of Model Rule 1.2 becomes crucial. The case illustrates a conflict between Marks desire for a substantial trial and Emilys professional opinion favoring a settlement. Here, Emily must balance respecting Marks autonomy with her obligation to offer competent advice. She is faced with questions about overriding Mark’s decision, adhering to a potentially less beneficial trial strategy, ensuring Mark is fully informed, and considering whether to continue representation if Marks choices might harm his case. Emilys challenge is to navigate these issues while complying with Model Rule 1.2. Non-compliance could lead to ethical complaints, legal malpractice claims, disciplinary actions, and reputational damage. Therefore, Emilys approach should involve transparent and effective communication with Mark to ensure decisions align with his best interests and professional ethical standards.', 
    'This rule requires lawyers like David to be diligent and prompt. They must not neglect a legal matter entrusted to them. Failing to following this Rule can lead to:',
    'Attorney Michael is in a challenging situation, representing a high-profile politician charged with serious offenses, a case that has drawn intense interest from the media. The journalists are aggressively seeking insider information, but Michael is concurrently facing the stringent demand for confidentiality from his client. This creates an ethical dilemma where he must carefully balance the pressure from media inquiries against his duty to maintain client confidentiality as mandated by Rule 1.6. In navigating this complex scenario, several key questions emerge for Michael to consider, including how to manage the medias requests without compromising the confidential nature of the information entrusted to him by his client. This leads to the following Consequences of Rule Violation:',
    'Identifying Conflicts: Attorney Alex needs to determine if there’s a conflict of interest between Company A and Company B. Obtaining Consent: If a conflict exists, Alex must get informed consent from both companies to continue representing them.',
    'In the scenario involving Attorney Lisa and Tech Innovators Inc., Lisa faces a potential conflict of interest due to her personal interest in investing in the company. As Tech Innovators Inc.s legal counsel, she needs to carefully consider the implications of her potential investment under Rule 1.8 of the American Bar Associations Model Rules of Professional Conduct. This rule addresses conflicts of interest related to a lawyers financial interests in a clients business transaction. Lisa must ensure that her investment does not compromise her professional obligation to provide unbiased legal advice. She is required to disclose her personal interest to Tech Innovators Inc., seek their informed consent, and possibly recuse herself from certain matters to avoid any appearance of impropriety or conflict. Failure to appropriately address these issues could lead to ethical complaints, legal malpractice claims, professional discipline, and reputational damage. These are the key points',
    'Michael faces ethical dilemmas in deciding whether using the information from his former client, Client X, in the current case with Client Y, breaches Rule 1.9. He must deliberate on whether its necessary to obtain Client Xs consent to use this sensitive information. Additionally, Michael needs to navigate his duties to both clients carefully to avoid any conflicts of interest. Given these complexities, Michael might need to consider the possibility of recusing himself from representing Client Y to sidestep potential ethical issues. This decision would be in line with maintaining professional integrity and adhering to the ethical standards set by the legal. These are the Consequences of Non-Compliance:',
    'In the given scenario, Attorney Sarah faces a challenging situation. Her client, known as Defendant D, is embroiled in a grave criminal case. Complicating matters further is the existence of damaging evidence. This evidence poses a significant risk, as it has the potential to adversely impact Defendant Ds case. Attorney Sarahs role, as guided by Rule 2.1, is not only to navigate the legal intricacies of the case but also to weigh these broader considerations while advising Defendant D.',
    'Challenges: The patient accuses Dr. Smith of negligence, causing significant harm. The case involves complex medical details, and the evidence supporting Dr. Smiths defense is limited. Rule 3.1 Implications: Laura must ensure her defense strategy is reasonable and has merit as required by Rule 3.1.',
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
        "The lawyer can competently and diligently represent each affected client.",
        "The law doesn't forbid this representation.",
        "The lawyer isn't representing competing clients in the same legal proceeding.",
        "Each affected client gives informed consent in writing.",
    ],
    [
        "Business Transactions with Clients: A lawyer should not engage in a business transaction with a client or acquire an adverse financial interest unless: The terms are fair, reasonable, fully disclosed in writing, and understandable. The client is advised to seek independent legal counsel and given the opportunity to do so. The client provides informed, written consent.", 
        "Use of Client Information: A lawyer must not use information from client representation to the client's disadvantage unless the client gives informed consent.",
        "Soliciting Gifts: Soliciting substantial gifts from a client, or preparing documents giving substantial gifts to the lawyer or their relatives, is prohibited unless the lawyer is related to the client.",
        "Literary or Media Rights: Lawyers cannot negotiate for media rights about the client's case before the legal representation ends",
        "Financial Assistance to Clients: Lawyers may not provide financial assistance to clients in litigation, except for advancing court costs and litigation expenses, and, in the case of indigent clients, covering basic living expenses without seeking reimbursement.",
        "Limits on Malpractice Liability: Lawyers cannot limit their malpractice liability unless the client is independently represented in the agreement.",
        "Proprietary Interest in Litigation: Lawyers should not acquire a proprietary interest in a client's litigation, except for lien securing fees or expenses, or in the case of reasonable contingent fees.",
        "Sexual Relationships: A lawyer should not engage in sexual relations with a client unless a consensual relationship existed before the client-lawyer relationship.",
        "Firm-Wide Application: These rules apply to all lawyers associated in a firm.",
    ],
    [
        "Confidential Information: Michael has confidential information about Client X that could be relevant to Client Y's case.",
        "Rule 1.9 Considerations: This rule emphasizes the importance of not using or disclosing a former client's confidential information to their disadvantage unless they give informed consent or it's allowed by law.",
    ],
    [
        "The key issue is the existence of damaging evidence that Attorney Sarah knows about.",
        "Defendant wants to keep this evidence hidden, believing it will hurt their case.",
    ],
    [
       "Exception in Criminal Cases: For lawyers defending clients in criminal cases or cases that might lead to imprisonment, they are permitted to demand the prosecution to prove every element of the case.",
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
        "Ethical Complaints: From either company.",
        "Legal Malpractice Claims: If the conflict affects legal representation.",
        "Professional Discipline: Potential investigation and penalties from legal authorities.",
        "Reputational Damage: Negative public perception."
    ],
    [
        "Personal Investment Conflict: Lisa's interest in investing in Tech Innovators Inc. could create a conflict of interest. She must evaluate whether this interest might affect her legal judgment.",
        "Investment Opportunity and Ethical Obligations: Lisa's potential investment must be assessed for fairness and should not adversely affect her representation of the company. She needs to fully disclose this interest and possibly seek informed consent from the company.",
        "Disclosure and Informed Consent: Lisa must inform Tech Innovators Inc. of her investment interest and ensure the company understands the implications. She may need the company’s informed consent, possibly documented in writing.",
        "Balancing Professional Obligations: Lisa should ensure her financial interest doesn't compromise her duty to provide unbiased legal advice. This might include refraining from the investment or recusing herself from matters where her interest could conflict with her professional duties.",
        "Potential Consequences of Non-Compliance: Non-compliance with Rule 1.8 could lead to ethical complaints, legal malpractice claims, professional discipline, and reputational damage. Lisa must carefully navigate this situation to avoid compromising her professional obligations while maintaining the best interests of Tech Innovators Inc.",
    ],
    [
        "Ethical Complaints: Client X or others could file a complaint against Michael for misusing confidential information.",
        "Legal and Professional Risks: Michael risks legal malpractice claims, professional discipline, and reputational damage if he mishandles the confidential information of his former client.",
    ],
    [
        "Legal Risks: Defendant D might not understand the implications of hiding the evidence, leading to a poor trial outcome.",
        'Ethical Concerns: Failure to provide objective advice could lead to ethical complaints.',
        "Risk of Conviction: If the prosecution later finds the evidence, it could lead to Defendant D’s conviction.",
        "Reputational Damage: Attorney Sarah's professional standing could suffer if perceived as biased or unresponsive.",
    ],
    [
        "If Laura fails to comply with Rule 3.1, she risks legal repercussions, ethical concerns, reputational damage, and increased legal costs.",
    ],
    
  ];

  const conclusion = [
    'Adhering to the duty of competence under Model Rule 1.1 is fundamental in law practice, especially in specialized fields like patent law. Lawyers need to recognize their limitations and acquire necessary expertise or collaborate with experts to prevent negative impacts on both themselves and their clients.',
    '',
    'This Rule highlights the need for lawyers to be diligent and timely. In this scenario, Davids heavy caseload leads to missing a crucial deadline, jeopardizing Sarahs case. To adhere to Rule 1.3, David should manage his workload better, allocate enough time to each case, and address any lapses in his service promptly.',
    'Priority on Confidentiality: Michael must be cautious in media interactions, avoid disclosing confidential information, and focus on protecting his client’s privacy and interests. Compliance with Rule 1.6 is crucial to his professional integrity and client trust.',
    '',
    'Importance of Rule 1.7: It’s crucial for Attorney Alex to identify and manage conflicts of interest to provide fair and effective legal representation, while adhering to ethical standards and avoiding negative consequences.',
    'Importance of Rule 1.9 Compliance: Michael must protect Client Xs confidentiality while also effectively representing Client Y, potentially requiring informed consent or other ethical safeguards to ensure he adheres to his professional duties.',
    'Attorney Sarah must adhere strictly to Rule 2.1, which is vital for ensuring ethical compliance and responsible decision-making in the criminal defense case. This adherence involves transparently discussing the risks and benefits of the evidence in question. Its imperative for her to foster an environment of open dialogue, enabling a thorough exchange of views and considerations. Furthermore, she is tasked with proposing strategies that not only align with Defendant Ds goals but also adhere to ethical standards and legal responsibilities. Through this approach, Attorney Sarah can navigate the complexities of the case while upholding the principles of Rule 2.1, thereby ensuring a balanced and ethically sound legal strategy.',
    'Lauras adherence to Rule 3.1 is crucial for ethical representation and for maintaining professional standards in the legal field.',
  ]


  const videoStyles = {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
    transform: zoom ? 'scale(1.2)' : 'scale(1)',
    transition: 'transform 0.5s',
  };

  console.log(props.tutorial_text)

  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      <HexLogo />
      <Title value={(props.tutorial_text[props.currentIndex] != undefined) ? props.tutorial_text[props.currentIndex].name : headers[props.currentIndex]} />
{/*       
      <div style={{...videoStyles, display: 'flex', justifyContent: 'center', margin: '20px'}}>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/R9OHn5ZF4Uo?si=7z2akiELGhjCaO1R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div> */}
  
      <IntegrateBox 
        heading={(props.tutorial_text[props.currentIndex] != undefined) ? props.tutorial_text[props.currentIndex].subheading_one : heading_first[props.currentIndex]} 
        description={(props.tutorial_text[props.currentIndex]!= undefined) ? props.tutorial_text[props.currentIndex].paragraph_one : description_first[props.currentIndex]}  
        items={(props.tutorial_text[props.currentIndex] != undefined) ? props.tutorial_text[props.currentIndex].bulletpoint_one : list_items_first[props.currentIndex]}   
      ></IntegrateBox>


      <IntegrateBoxAndConclusion 
        heading={(props.tutorial_text[props.currentIndex] != undefined) ? props.tutorial_text[props.currentIndex].subheading_two : heading_second[props.currentIndex]} 
        description={(props.tutorial_text[props.currentIndex]!= undefined) ? props.tutorial_text[props.currentIndex].paragraph_two : description_second[props.currentIndex]}  
        items={(props.tutorial_text[props.currentIndex] != undefined) ? props.tutorial_text[props.currentIndex].bulletpoint_two : list_items_second[props.currentIndex]}  
        conclusion={(props.tutorial_text[props.currentIndex] != undefined) ? props.tutorial_text[props.currentIndex].conclusion : conclusion[props.currentIndex]}
      ></IntegrateBoxAndConclusion>
    </Box>
  );
};

export default TutorialBackground;
