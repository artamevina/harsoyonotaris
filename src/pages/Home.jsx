import Header from '../components/Header'
import { HeroSection, NotarisSection, OfficeGallery, PPATSection, ServiceSection } from '../components/SectionUi'

export default function Home() { 
    return (
        <>
            <Header />
            <div className="bg-gray-900 text-white">
                <HeroSection />
                <NotarisSection />
                <PPATSection />
                <ServiceSection />
                <OfficeGallery />
            </div>
        </>
    )
}