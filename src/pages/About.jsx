import { AboutSection, ContactSection, EducationSection, OrganizationSection, VisionSection, } from "../components/SectionUi";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

export default function About() {
    return (
        <>
            <Header />
            <Breadcrumb />
            <div className="font-sans bg-gray-50 text-gray-700">
                <AboutSection />
                <EducationSection />
                <OrganizationSection />
                <VisionSection />
                <ContactSection />
            </div>
        </>
    )
}