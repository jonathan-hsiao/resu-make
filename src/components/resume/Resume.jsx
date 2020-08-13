import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { isColor, replaceColor, refreshFonts } from "../../utils";

const Resume = () => {
    const context = useContext(AppContext);
    const { state } = context;
    const { data } = state;

    const [panelWidth, setPanelWidth] = useState(32);

    const styles = {
        resumeStyle: {
            width: "8.5in",
            height: "11in",
            backgroundColor: "white",
            overflow: "hidden",
            padding: 0,
            WebkitPrintColorAdjust: "exact",
            colorAdjust: "exact"
        },

        // Header Styles
        headerStyle: {
            backgroundColor: replaceColor(data.colors.header.background.value, "white"),
            height: "17.5%",
            margin: 0,
            display: "flex"
        },
        headerTitleStyle: {
            color: replaceColor(data.colors.header.title.value, "white"),
            fontFamily: data.fonts.titles.mainTitle.family,
            fontStyle: data.fonts.titles.mainTitle.style,
            fontSize: data.fonts.titles.mainTitle.size + "px",
            fontWeight: data.fonts.titles.mainTitle.weight,
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "3px",
            textAlign: (data.personal.photo !== "") ? "left" : "center"
        },
        headerSubTitleStyle: {
            color: replaceColor(data.colors.header.subTitle.value, "white"),
            fontFamily: data.fonts.titles.subTitle.family,
            fontStyle: data.fonts.titles.subTitle.style,
            fontSize: data.fonts.titles.subTitle.size + "px",
            fontWeight: data.fonts.titles.subTitle.weight,
            textTransform: "uppercase",
            letterSpacing: "2px",
            textAlign: (data.personal.photo !== "") ? "left" : "center"
        },
        headerRuleStyle: {
            color: replaceColor(data.colors.header.rule.value, "white"),
            borderTop: "1px solid",
            marginTop: "20px",
            marginBottom: "-20px",

            textAlign: (data.personal.photo !== "") ? "left" : "",
            marginLeft: (data.personal.photo !== "") ? 0 : "",
            width: (data.personal.photo !== "") ? 0 : "50px"
        },
        headerTitleContainerStyle: {
            alignItems: "center",
            display: "flex",
            paddingLeft: (data.personal.photo !== "") ? "25px" : 0,
            width: (100 - ((data.personal.photo !== "") ? panelWidth : 0)) + "%"
        },
        headerPhotoStyle: {
            color: replaceColor(data.colors.header.photoBorder.value, "white"),
            objectFit: "cover", /* Do not scale the image */
            objectPosition: "center", /* Center the image within the element */
            height: "145px",
            width: "145px",
            borderRadius: "50%",
            borderWidth: "1px",
            borderStyle: "solid",
            margin: "auto"
        },
        headerPhotoBackgroundStyle: {
            backgroundColor: replaceColor(data.colors.header.photoBackground.value, "white"),
            padding: 0,
            display: "flex",
            width: "100%",
            height: "100%"
        },
        headerPhotoContainerStyle: {
            padding: 0,
            width: panelWidth + "%"
        },

        // Main Page Styles
        mainPageStyle: {
            height: "82.5%",
            margin: 0,
            display: "flex"
        },
        bodySectionStyle: {
            margin: "15px 0 25px"
        },
        rowStyle: {
            display: "flex",
            flexWrap: "wrap",
            marginLeft: 0,
            marginRight: 0,
            width: "100%"
        },

        // Panel Styles
        panelStyle: {
            backgroundColor: replaceColor(data.colors.panel.background.value, "white"),
            padding: "10px 30px 10px 30px",
            height: "100%",
            width: panelWidth + "%"
        },
        panelSectionHeaderStyle: {
            color: replaceColor(data.colors.panel.sectionHeader.value, "white"),
            fontFamily: data.fonts.titles.sectionTitle.family,
            fontStyle: data.fonts.titles.sectionTitle.style,
            fontSize: data.fonts.titles.sectionTitle.size + "px",
            fontWeight: data.fonts.titles.sectionTitle.weight,
            textTransform: "uppercase",
            marginBottom: 0,
            fontSize: "15px",
            fontWeight: 600
        },
        contactIconStyle: {
            color: replaceColor(data.colors.panel.contactIcons.value, "white"),
            fontSize: "16px",
            textAlign: "center"
        },
        contactTextStyle: {
            color: replaceColor(data.colors.panel.text.value, "white"),
            fontFamily: data.fonts.text.contactText.family,
            fontStyle: data.fonts.text.contactText.style,
            fontSize: data.fonts.text.contactText.size + "px",
            fontWeight: data.fonts.text.contactText.weight,
            paddingLeft: "8px",
            marginBottom: 0,
            textAlign: "left",
            width: "100%",
            wordBreak: "break-word"
        },
        contactIconContainerStyle: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        },
        contactRowStyle: {
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
        },
        panelItemHeaderStyle: {
            color: replaceColor(data.colors.panel.itemHeader.value, "white"),
            fontFamily: data.fonts.titles.itemTitle.family,
            fontStyle: data.fonts.titles.itemTitle.style,
            fontSize: data.fonts.titles.itemTitle.size + "px",
            fontWeight: data.fonts.titles.itemTitle.weight
        },
        panelItemSubHeaderStyle: {
            color: replaceColor(data.colors.panel.itemSubHeader.value, "white"),
            fontFamily: data.fonts.titles.itemSubTitle.family,
            fontStyle: data.fonts.titles.itemSubTitle.style,
            fontSize: data.fonts.titles.itemSubTitle.size + "px",
            fontWeight: data.fonts.titles.itemSubTitle.weight
        },
        panelItemTextStyle: {
            color: replaceColor(data.colors.panel.text.value, "white"),
            fontFamily: data.fonts.text.itemText.family,
            fontStyle: data.fonts.text.itemText.style,
            fontSize: data.fonts.text.itemText.size + "px",
            fontWeight: data.fonts.text.itemText.weight
        },
        panelSkillTextStyle: {
            color: replaceColor(data.colors.panel.text.value, "white"),
            fontFamily: data.fonts.text.skillsText.family,
            fontStyle: data.fonts.text.skillsText.style,
            fontSize: data.fonts.text.skillsText.size + "px",
            fontWeight: data.fonts.text.skillsText.weight,
            marginBottom: "10px"
        },
        panelProfileTextStyle: {
            color: replaceColor(data.colors.panel.text.value, "white"),
            fontFamily: data.fonts.text.profileText.family,
            fontStyle: data.fonts.text.profileText.style,
            fontSize: data.fonts.text.profileText.size + "px",
            fontWeight: data.fonts.text.profileText.weight,
            lineHeight: 1.8
        },
        panelRuleStyle: {
            color: replaceColor(data.colors.panel.rule, "white"), 
            backgroundColor: replaceColor(data.colors.panel.rule.value, "white"),
            marginTop: "5px",
            marginBottom: "10px",
            border: "0 none",
            height: "1px"
        },

        // Body Styles
        bodyStyle: {
            backgroundColor: replaceColor(data.colors.body.background.value, "white"),
            padding: "10px 30px 10px 25px",
            height: "100%",
            width: (100 - panelWidth) + "%"
        },
        bodySectionHeaderStyle: {
            color: replaceColor(data.colors.body.sectionHeader.value, "white"),
            fontFamily: data.fonts.titles.sectionTitle.family,
            fontStyle: data.fonts.titles.sectionTitle.style,
            fontSize: data.fonts.titles.sectionTitle.size + "px",
            fontWeight: data.fonts.titles.sectionTitle.weight,
            textTransform: "uppercase",
            marginBottom: 0,
            fontSize: "15px",
            fontWeight: 600
        },
        bodyItemHeaderStyle: {
            color: replaceColor(data.colors.body.itemHeader.value, "white"),
            fontFamily: data.fonts.titles.itemTitle.family,
            fontStyle: data.fonts.titles.itemTitle.style,
            fontSize: data.fonts.titles.itemTitle.size + "px",
            fontWeight: data.fonts.titles.itemTitle.weight
        },
        bodyItemSubHeaderStyle: {
            color: replaceColor(data.colors.body.itemSubHeader.value, "white"),
            fontFamily: data.fonts.titles.itemSubTitle.family,
            fontStyle: data.fonts.titles.itemSubTitle.style,
            fontSize: data.fonts.titles.itemSubTitle.size + "px",
            fontWeight: data.fonts.titles.itemSubTitle.weight
        },
        bodyItemDate: {
            color: replaceColor(data.colors.body.date.value, "white"),
            fontFamily: data.fonts.text.dateText.family,
            fontStyle: data.fonts.text.dateText.style,
            fontSize: data.fonts.text.dateText.size + "px",
            fontWeight: data.fonts.text.dateText.weight
        },
        bodyItemDateDivider: {
            color: replaceColor(data.colors.body.dateDivider.value, "white"),
            fontFamily: data.fonts.text.dateText.family,
            // fontStyle: data.fonts.text.dateText.style,
            fontSize: data.fonts.text.dateText.size + "px",
            fontWeight: data.fonts.text.dateText.weight
        },
        bodyItemTextStyle: {
            color: replaceColor(data.colors.body.text.value, "white"),
            fontFamily: data.fonts.text.itemText.family,
            fontStyle: data.fonts.text.itemText.style,
            fontSize: data.fonts.text.itemText.size + "px",
            fontWeight: data.fonts.text.itemText.weight
        },
        bodyRuleStyle: {
            color: replaceColor(data.colors.body.rule, "white"), 
            backgroundColor: replaceColor(data.colors.panel.rule.value, "white"),
            marginTop: "5px",
            marginBottom: "10px",
            border: "0 none",
            height: "1px"
        }
    }


    const Photo = () => ( 
        (data.personal.photo !=="") && (
            <div style={styles.headerPhotoContainerStyle}>
                <div 
                    style={styles.headerPhotoBackgroundStyle}
                >
                    <img 
                        style={styles.headerPhotoStyle}
                        src={data.personal.photo}
                        alt="resume-pic"
                    />
                </div>
            </div>
        )
    );

    const Header = () => {
        return (
            <div style={styles.headerTitleContainerStyle}>
                <div style={{width: "100%"}}>
                    <h1 style={styles.headerTitleStyle}>
                        {data.personal.firstName} {data.personal.lastName}
                    </h1>
                    <h2 style={styles.headerSubTitleStyle}>
                        {data.personal.subtitle}
                    </h2>
                    <hr style={styles.headerRuleStyle}/>
                </div>
            </div>
        )
    };

    const SectionHeading = ({sectionTitle, headingStyle, ruleStyle}) => (
        <div>
            <h6 style={headingStyle}>{sectionTitle}</h6>
            <hr style={ruleStyle}></hr>
        </div>
    );

    const ContactItem = ({icon, value}) => (
        value && (
            <div style={styles.contactRowStyle}>
                <div style={styles.contactIconContainerStyle}>
                    <i className="material-icons" style={styles.contactIconStyle}>{icon}</i>
                </div>
                <p style={styles.contactTextStyle}>{value}</p>
            </div>
        )
    );

    const Contact = () => (
        <div style={styles.bodySectionStyle}>
            <SectionHeading 
                sectionTitle="Contact"
                headingStyle={styles.panelSectionHeaderStyle}
                ruleStyle={styles.panelRuleStyle}
            />
            <ContactItem 
                icon="phone"
                value={data.personal.phone}
            />
            <ContactItem 
                icon="email"
                value={data.personal.email}
            />
            <ContactItem 
                icon="language"
                value={data.personal.website}
            />
            <ContactItem 
                icon="location_on"
                value={data.personal.location}
            />
        </div>
    );

    const Profile = () => (
        data.profile &&
        data.profile.enable && (
            <div style={styles.bodySectionStyle}>
                <SectionHeading 
                    sectionTitle={data.profile.heading}
                    headingStyle={styles.panelSectionHeaderStyle}
                    ruleStyle={styles.panelRuleStyle}
                />
                <p style={styles.panelProfileTextStyle}>{data.profile.body}</p>
            </div>
        )
    );

    const SkillItem = (item, index, arr) => {
        const suffix = (index !== arr.length - 1) && "\xa0|\xa0"
        return (
            <p style={styles.panelSkillTextStyle}>{item.skill}{suffix}</p>
        )
    };

    const Skills = () => (
        data.skills &&
        data.skills.enable && (
            <div style={styles.bodySectionStyle}>
                <SectionHeading 
                    sectionTitle={data.skills.heading} 
                    headingStyle={styles.panelSectionHeaderStyle}
                    ruleStyle={styles.panelRuleStyle}
                />
                <div style={styles.rowStyle}>
                    {data.skills.items.map(SkillItem)}
                </div>
            </div>
        )
    );

    const CertificationCert = (cert) => {
        const description = (cert.description !== "") && 
            <p style={styles.panelItemTextStyle}>{cert.description}</p>
        return (
            <div key={cert.id}>
                <h6 style={styles.panelItemSubHeaderStyle}>{cert.name} </h6>
                {description}
            </div>
        );
    };

    const CertificationItem = (item) => (
        <div key={item.id}>
            <h6 style={styles.panelItemHeaderStyle}>{item.institutionName}</h6>
            {item.subItems.map(CertificationCert)}
        </div>
    );

    const Certifications = () => (
        data.certifications && 
        data.certifications.enable && (
            <div style={styles.bodySectionStyle}>
                <SectionHeading 
                    sectionTitle={data.certifications.heading} 
                    headingStyle={styles.panelSectionHeaderStyle}
                    ruleStyle={styles.panelRuleStyle}
                />
                {data.certifications.items.map(CertificationItem)}
            </div>
        )
    );

    const EducationMajor = (major) => {
        const description = (major.description !== "") && 
            <p style={styles.bodyItemTextStyle}>{major.description}</p>
        const separator = (major.degree) && (major.start || major.end) && 
            <h6 style={styles.bodyItemDateDivider}>&nbsp;|&nbsp;</h6>
        const dateDash = (major.start && major.end) && 
            <h6 style={styles.bodyItemDate}>&nbsp;-&nbsp;</h6>
        return (
            <div key={major.id}>
                    <div style={styles.rowStyle}>
                        <h6 style={styles.bodyItemSubHeaderStyle}>{major.degree} </h6>
                        {separator}
                        <h6 style={styles.bodyItemDate}>{major.start}</h6>
                        {dateDash}
                        <h6 style={styles.bodyItemDate}>{major.end}</h6>
                    </div>
                {description}
            </div>
        );
    };

    const EducationItem = (item) => (
            <div key={item.id}>
                <h6 style={styles.bodyItemHeaderStyle}>{item.schoolName}</h6>
                {item.subItems.map(EducationMajor)}
            </div>
    );

    const Education = () => (
        data.education && 
        data.education.enable && (
            <div style={styles.bodySectionStyle}>
                <SectionHeading 
                    sectionTitle={data.education.heading} 
                    headingStyle={styles.bodySectionHeaderStyle}
                    ruleStyle={styles.bodyRuleStyle}
                />
                {data.education.items.map(EducationItem)}
            </div>
        )
    );

    const WorkRole = (role) => {
        const description = (role.description !== "") && 
            <p style={styles.bodyItemTextStyle}>{role.description}</p>
        const separator = (role.title) && (role.start || role.end) && 
            <h6 style={styles.bodyItemDateDivider}>&nbsp;|&nbsp;</h6>
        const dateDash = (role.start && role.end) && 
            <h6 style={styles.bodyItemDate}>&nbsp;-&nbsp;</h6>
        return (
            <div key={role.id}>
                    <div style={styles.rowStyle}>
                        <h6 style={styles.bodyItemSubHeaderStyle}>{role.title} </h6>
                        {separator}
                        <h6 style={styles.bodyItemDate}>{role.start}</h6>
                        {dateDash}
                        <h6 style={styles.bodyItemDate}>{role.end}</h6>
                    </div>
                {description}
            </div>
        );
    };

    const WorkItem = (item) => (
        <div key={item.id}>
            <h6 style={styles.bodyItemHeaderStyle}>{item.companyName}</h6>
            {item.subItems.map(WorkRole)}
        </div>
    );

    const Work = () => (
        data.work &&
        data.work.enable && (
            <div style={styles.bodySectionStyle}>
                <SectionHeading 
                    sectionTitle={data.work.heading} 
                    headingStyle={styles.bodySectionHeaderStyle}
                    ruleStyle={styles.bodyRuleStyle}
                />
                {data.work.items.map(WorkItem)}
            </div>
        )
    );

    const ExtraItem = (item) => {
        const description = (item.description !== "") && 
            <p style={styles.bodyItemTextStyle}>{item.description}</p>
        return (
            <div key={item.id}>
                <h6 style={styles.bodyItemHeaderStyle}>{item.title}</h6>
                <h6 style={styles.bodyItemSubHeaderStyle}>{item.subtitle}</h6>
                {description}
            </div>
        );
    };

    const Extras = () => (
        data.extras && 
        data.extras.enable && (
            <div style={styles.bodySectionStyle}>
                <SectionHeading 
                    sectionTitle={data.extras.heading} 
                    headingStyle={styles.bodySectionHeaderStyle}
                    ruleStyle={styles.bodyRuleStyle}
                />
                {data.extras.items.map(ExtraItem)}
            </div>
        )
    );


    return (
        <div className="resume" style={styles.resumeStyle}>
            {/* resume header */}
            <div style={styles.headerStyle}>
                <Photo />
                <Header />
            </div>

            {/* resume body */}
            <div style={styles.mainPageStyle}>

                {/* side panel */}
                <div style={styles.panelStyle}>
                    <Contact />
                    <Profile />
                    <Skills />
                    <Certifications />
                </div>

                {/* main panel */}
                <div style={styles.bodyStyle}>
                    <Work />
                    <Education />
                    <Extras />
                </div>

            </div>
        </div>
    );
}

export default Resume;