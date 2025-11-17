import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheckCircle,
    faCheck,
    faCircle,
    faCalendarAlt,
    faEye,
    faBullseye,
    faScaleBalanced,
    faTasks,
    faGavel,
    faLandmark,
    faListCheck,
    faUserTie,
    faFileContract,
    faBalanceScale,
    faHandshake
} from '@fortawesome/free-solid-svg-icons'

export const SectionHeader = ({ title, description, darkMode = false }) => (
    <div className="text-center mb-16" data-aos="fade-up">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>{title}</h2>
        <div className={`w-20 h-1 ${darkMode ? 'bg-gold-500' : 'bg-blue-600'} mx-auto mb-6`}></div>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>{description}</p>
    </div>
);

export const generateMetaDescription = (content, maxLength = 160) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength
        ? plainText.substring(0, maxLength) + '...'
        : plainText;
};

export const createSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export const LegalSection = ({ title, icon, items, iconColor, animation, darkMode = false, description }) => (
    <div
        className={`${darkMode ? 'bg-gray-800 border-gold-500' : 'bg-gray-50 border-blue-600'} border-l-4 p-6 rounded-lg mb-6`}
        data-aos={animation}
    >
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center`}>
            <FontAwesomeIcon
                icon={getIconFromString(icon)}
                className={`${darkMode ? 'text-gold-500' : 'text-blue-600'} mr-3 text-xl`}
            />
            {title}
        </h3>
        {description && <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>}
        <ul className="space-y-3">
            {items.map((item) => (
                <ListItem
                    key={item}
                    text={item}
                    icon={faCheckCircle}
                    iconColor={iconColor || (darkMode ? 'text-gold-500' : 'text-blue-600')}
                    darkMode={darkMode}
                />
            ))}
        </ul>
    </div>
);

export const AuthoritySection = ({ title, iconComponent, categories, darkMode = false }) => (
    <div
        className={`${darkMode ? 'bg-gray-800 border-gold-500' : 'bg-gray-50 border-blue-600'} border-l-4 p-6 rounded-lg mb-6`}
        data-aos="fade-up"
    >
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center`}>
            {iconComponent}
            {title}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
                <div key={category.title}>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{category.title}</h4>
                    <ul className="space-y-2">
                        {category.items.map((item) => (
                            <ListItem
                                key={item}
                                text={item}
                                icon={getIconFromString(category.icon) || faCheck}
                                iconColor={category.iconColor || (darkMode ? 'text-gold-500' : 'text-blue-600')}
                                smallIcon
                                darkMode={darkMode}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);

const ListItem = ({ text, icon, iconColor, smallIcon = false, darkMode = false }) => (
    <li className="flex items-start">
        <FontAwesomeIcon
            icon={icon}
            className={`${smallIcon ? 'text-xs mt-1' : 'text-sm mt-1'} ${iconColor} mr-3`}
        />
        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{text}</span>
    </li>
);

export const ServiceCard = ({ title, icon, color, description, items, animationDelay, darkMode = false }) => {
    const colorClasses = {
        blue: {
            bg: darkMode ? "bg-gray-700" : "bg-blue-100",
            text: darkMode ? "text-blue-400" : "text-blue-600",
            iconColor: darkMode ? "text-gold-500" : "text-blue-600"
        },
        green: {
            bg: darkMode ? "bg-gray-700" : "bg-green-100",
            text: darkMode ? "text-green-400" : "text-green-600",
            iconColor: darkMode ? "text-gold-500" : "text-green-600"
        },
        gold: {
            bg: "bg-gold-100",
            text: "text-gold-600",
            iconColor: "text-gold-500"
        }
    };

    const selectedColor = colorClasses[color] || colorClasses.gold;

    return (
        <div
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'} p-8 rounded-xl shadow-md hover:shadow-lg transition-all card-hover`}
            data-aos="fade-up"
            data-aos-delay={animationDelay}
        >
            <div className={`${selectedColor.bg} w-14 h-14 rounded-full flex items-center justify-center mb-6`}>
                <FontAwesomeIcon
                    icon={getIconFromString(icon)}
                    className={`${selectedColor.text} text-2xl`}
                />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>{title}</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item} className="flex items-center">
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={`${selectedColor.iconColor} mr-2`}
                        />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const GalleryCard = ({ imageUrl, title, description, darkMode = false }) => (
    <div
        className={`overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all card-hover border ${darkMode ? 'border-gray-700 hover:border-gold-500' : 'border-gray-200 hover:border-blue-500'}`}
        data-aos="fade-up"
        data-aos-delay="100"
    >
        <div className="relative overflow-hidden h-64">
            <img
                src={imageUrl}
                alt={`Kantor Notaris Cirebon - ${title}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-gray-900/80 to-transparent' : 'bg-gradient-to-t from-gray-800/80 to-transparent'}`}></div>
        </div>
        <div className={`p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {title}
            </h3>
            <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
            </p>
            <div className="mt-3 flex items-center">
                <span className={`inline-block px-2 py-1 text-xs rounded ${darkMode ? 'bg-gold-500/20 text-gold-400' : 'bg-blue-500/20 text-blue-600'}`}>
                    Notaris & PPAT Tegal
                </span>
            </div>
        </div>
    </div>
);

export const ProfileImage = ({ imageUrl, altText, darkMode = false }) => (
    <div className="md:w-1/3 mb-10 md:mb-0" data-aos="fade-right">
        <img
            src={imageUrl}
            alt={altText}
            className={`rounded-lg shadow-xl w-full max-w-md h-auto border-4 ${darkMode ? 'border-gold-500' : 'border-blue-200'}`}
        />
    </div>
);

export const ProfileDescription = ({ title, description, darkMode = false }) => (
    <>
        <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>{title}</h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{description}</p>
    </>
);

export const SkillsSection = ({ skills, darkMode = false }) => {
    const colorClasses = {
        blue: { bg: darkMode ? "bg-blue-900/50" : "bg-blue-100", text: darkMode ? "text-blue-400" : "text-blue-600" },
        green: { bg: darkMode ? "bg-green-900/50" : "bg-green-100", text: darkMode ? "text-green-400" : "text-green-600" },
        purple: { bg: darkMode ? "bg-purple-900/50" : "bg-purple-100", text: darkMode ? "text-purple-400" : "text-purple-600" },
        yellow: { bg: darkMode ? "bg-yellow-900/50" : "bg-yellow-100", text: darkMode ? "text-yellow-400" : "text-yellow-600" },
        gold: { bg: "bg-gold-500/10", text: "text-gold-500" }
    };

    return (
        <div className="mb-8">
            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Keahlian Profesional</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                    <div key={skill.title} className="flex items-start">
                        <div className={`${colorClasses[skill.color]?.bg || colorClasses.gold.bg} p-2 rounded-full mr-3 mt-1`}>
                            <FontAwesomeIcon
                                icon={getIconFromString(skill.icon)}
                                className={`${colorClasses[skill.color]?.text || colorClasses.gold.text}`}
                            />
                        </div>
                        <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{skill.title}</h5>
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{skill.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ExperienceSection = ({ title, items, darkMode = false }) => (
    <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border`}>
        <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>{title}</h4>
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={`${item.role}-${index}`}>
                    <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.role}</h5>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{item.details}</p>
                </div>
            ))}
        </div>
    </div>
);

export const EducationCard = ({ degree, institution, thesis, darkMode = false }) => {
    return (
        <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} p-6 rounded-lg shadow-md border mb-6 hover:shadow-lg transition-all`}>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{degree}</h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {institution}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const TrainingCard = ({ title, description, year, icon, color, darkMode = false }) => {
    const colorClasses = {
        red: { bg: darkMode ? "bg-red-900/50" : "bg-red-100", text: darkMode ? "text-red-400" : "text-red-600" },
        green: { bg: darkMode ? "bg-green-900/50" : "bg-green-100", text: darkMode ? "text-green-400" : "text-green-600" },
        blue: { bg: darkMode ? "bg-blue-900/50" : "bg-blue-100", text: darkMode ? "text-blue-400" : "text-blue-600" },
        yellow: { bg: darkMode ? "bg-yellow-900/50" : "bg-yellow-100", text: darkMode ? "text-yellow-400" : "text-yellow-600" },
        emerald: { bg: darkMode ? "bg-emerald-900/50" : "bg-emerald-100", text: darkMode ? "text-emerald-400" : "text-emerald-600" },
        purple: { bg: darkMode ? "bg-purple-900/50" : "bg-purple-100", text: darkMode ? "text-purple-400" : "text-purple-600" },
        indigo: { bg: darkMode ? "bg-indigo-900/50" : "bg-indigo-100", text: darkMode ? "text-indigo-400" : "text-indigo-600" },
        amber: { bg: darkMode ? "bg-amber-900/50" : "bg-amber-100", text: darkMode ? "text-amber-400" : "text-amber-600" },
        gold: { bg: "bg-gold-500/10", text: "text-gold-500" }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} p-6 rounded-lg shadow-md border hover:shadow-lg transition-all`}>
            <div className="flex items-start mb-3">
                <div className={`${colorClasses[color]?.bg || colorClasses.gold.bg} p-3 rounded-full mr-4 flex-shrink-0`}>
                    <FontAwesomeIcon
                        icon={getIconFromString(icon)}
                        className={`${colorClasses[color]?.text || colorClasses.gold.text} text-lg`}
                    />
                </div>
                <div>
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{description}</p>
                    <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm mt-1`}>{year}</p>
                </div>
            </div>
        </div>
    );
};

export const OrganizationCard = ({ name, icon, color, description, period, role, animationDelay, darkMode = false }) => {
    const colorClasses = {
        blue: { bg: darkMode ? "bg-blue-900/50" : "bg-blue-100", text: darkMode ? "text-blue-400" : "text-blue-600" },
        green: { bg: darkMode ? "bg-green-900/50" : "bg-green-100", text: darkMode ? "text-green-400" : "text-green-600" },
        purple: { bg: darkMode ? "bg-purple-900/50" : "bg-purple-100", text: darkMode ? "text-purple-400" : "text-purple-600" },
        indigo: { bg: darkMode ? "bg-indigo-900/50" : "bg-indigo-100", text: darkMode ? "text-indigo-400" : "text-indigo-600" },
        gold: { bg: "bg-gold-500/10", text: "text-gold-500" }
    };

    return (
        <div
            className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'} p-8 rounded-xl shadow-md hover:shadow-lg transition-all card-hover`}
            data-aos="fade-up"
            data-aos-delay={animationDelay}
        >
            <div className={`${colorClasses[color]?.bg || colorClasses.gold.bg} w-14 h-14 rounded-full flex items-center justify-center mb-6 border ${darkMode ? 'border-gold-500' : 'border-gray-300'}`}>
                <img src={icon} alt={`${name} icon`} className="w-full h-full rounded-full" />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>{name}</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>
            <div className="flex items-center text-sm text-gray-400">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                <span>{period}</span>
            </div>
            <div className="mt-3">
                <span className={`${colorClasses[color]?.bg || colorClasses.gold.bg} ${darkMode ? 'text-white' : 'text-gray-800'} text-xs px-2 py-1 rounded border ${darkMode ? 'border-gold-500' : 'border-gray-300'}`}>
                    {role}
                </span>
            </div>
        </div>
    );
};

export const BankCooperation = ({ title, banks, darkMode = false }) => (
    <div className="mt-8" data-aos="fade-up">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>{title}</h3>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-sm border max-w-5xl mx-auto`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {banks.map((bank, index) => (
                    <BankLogo
                        key={index}
                        name={bank.name}
                        imageUrl={bank.imageUrl}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </div>
    </div>
);

const BankLogo = ({ name, imageUrl, darkMode = false }) => (
    <div className={`flex items-center justify-center p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-md transition-all h-20`}>
        <img
            src={imageUrl}
            alt={`Bank ${name} - Mitra Notaris Cirebon`}
            className="h-full max-h-16 object-contain"
            loading="lazy"
        />
    </div>
);

export const VisionCard = ({ title, iconComponent, content, quote, color, animation, darkMode = false }) => {
    const colorClasses = {
        blue: { bg: darkMode ? "bg-blue-900/30" : "bg-blue-100", text: darkMode ? "text-blue-400" : "text-blue-600" },
        green: { bg: darkMode ? "bg-green-900/30" : "bg-green-100", text: darkMode ? "text-green-400" : "text-green-600" },
        purple: { bg: darkMode ? "bg-purple-900/30" : "bg-purple-100", text: darkMode ? "text-purple-400" : "text-purple-600" },
        gold: { bg: "bg-gold-500/10", text: "text-gold-500" }
    };

    return (
        <div
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-md border`}
            data-aos={animation}
        >
            <div className="flex items-center mb-6">
                <div className={`${colorClasses[color]?.bg || colorClasses.gold.bg} p-3 rounded-full mr-4 border ${darkMode ? 'border-gold-500' : 'border-gray-300'}`}>
                    {iconComponent}
                </div>
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{content}</p>
            <div className={`${colorClasses[color]?.bg || colorClasses.gold.bg} p-4 rounded-lg border ${darkMode ? 'border-gold-500' : 'border-gray-300'}`}>
                <p className={`${darkMode ? 'text-gray-200 italic' : 'text-gray-800 italic'}`}>{quote}</p>
            </div>
        </div>
    );
};

export const MissionCard = ({ title, iconComponent, items, color, animation, darkMode = false }) => {
    const colorClasses = {
        blue: { bg: darkMode ? "bg-blue-900/30" : "bg-blue-100", text: darkMode ? "text-blue-400" : "text-blue-600" },
        green: { bg: darkMode ? "bg-green-900/30" : "bg-green-100", text: darkMode ? "text-green-400" : "text-green-600" },
        purple: { bg: darkMode ? "bg-purple-900/30" : "bg-purple-100", text: darkMode ? "text-purple-400" : "text-purple-600" },
        gold: { bg: "bg-gold-500/10", text: "text-gold-500" }
    };

    return (
        <div
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-md border`}
            data-aos={animation}
        >
            <div className="flex items-center mb-6">
                <div className={`${colorClasses[color]?.bg || colorClasses.gold.bg} p-3 rounded-full mr-4 border ${darkMode ? 'border-gold-500' : 'border-gray-300'}`}>
                    {iconComponent}
                </div>
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
            </div>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={`${colorClasses[color]?.text || colorClasses.gold.text} mt-1 mr-3`}
                        />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const Loading = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
    )
}

const getIconFromString = (iconString) => {
    const iconMap = {
        'fa-scale-balanced': faScaleBalanced,
        'fa-tasks': faTasks,
        'fa-gavel': faGavel,
        'fa-landmark': faLandmark,
        'fa-list-check': faListCheck,
        'fa-user-tie': faUserTie,
        'fa-file-contract': faFileContract,
        'fa-balance-scale': faBalanceScale,
        'fa-handshake': faHandshake,
        'fa-eye': faEye,
        'fa-bullseye': faBullseye,
        'fa-circle': faCircle,
        'fa-check': faCheck,
        'fa-check-circle': faCheckCircle
    };

    return iconMap[iconString] || faCheckCircle;
};