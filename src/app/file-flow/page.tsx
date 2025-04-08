'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from 'react';
import Head from 'next/head';

// تعریف نوع برای شرکت حقوقی
interface LawFirm {
  name: string;
  specialization: string;
  location: string;
  languages: string;
  size: string;
  website?: string;
  email?: string;
  phone?: string;
  experience?: string;
  googleReviews?: string;
  legal500: boolean;
}

// تعریف نوع برای فیلترها
interface Filters {
  name: string;
  specialization: string;
  language: string;
  size: string;
}


export default function FileFlow() {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [filteredFirms, setFilteredFirms] = useState<LawFirm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    specialization: '',
    language: '',
    size: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: LawFirm[] = getLawFirmsData();
        setLawFirms(data);
        setFilteredFirms(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {
    const filterLawFirms = () => {
      let filtered: LawFirm[] = [...lawFirms];

      if (filters.name) {
        filtered = filtered.filter(firm => 
          firm.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      if (filters.specialization) {
        filtered = filtered.filter(firm => 
          firm.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
        );
      }

      if (filters.language) {
        filtered = filtered.filter(firm => 
          firm.languages.toLowerCase().includes(filters.language.toLowerCase())
        );
      }

      if (filters.size) {
        filtered = filtered.filter(firm => 
          firm.size.toLowerCase().includes(filters.size.toLowerCase())
        );
      }

      setFilteredFirms(filtered);
    };

    filterLawFirms();
  }, [filters, lawFirms]);

  return (
    <div >
      {/* <Head>
        <title>شرکت‌های حقوقی دبی</title>
        <meta name="description" content="فهرست شرکت‌های حقوقی در دبی" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

<Breadcrumb pageName="شرکت‌های حقوقی دبی" />

<div className="bg-white p-6 rounded-lg shadow-md mb-8">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">فیلترها</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام شرکت</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="جستجو بر اساس نام"
        value={filters.name}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">تخصص</label>
      <input
        id="specialization"
        type="text"
        name="specialization"
        placeholder="جستجو بر اساس تخصص"
        value={filters.specialization}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">زبان</label>
      <input
        id="language"
        type="text"
        name="language"
        placeholder="جستجو بر اساس زبان"
        value={filters.language}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">اندازه شرکت</label>
      <select
        id="size"
        name="size"
        value={filters.size}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">همه اندازه‌ها</option>
        <option value="Small">کوچک</option>
        <option value="Medium">متوسط</option>
        <option value="Large">بزرگ</option>
      </select>
    </div>
  </div>
</div>
<div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ردیف
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-75">
                      نام
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-96">
                      تخصص(ها)
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">
                      مکان
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-75">
                      زبان‌ها
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      اندازه
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      وب‌سایت
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      ایمیل
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      تلفن
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      سال‌های تجربه
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نظرات گوگل
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Legal 500
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFirms.length > 0 ? (
                    filteredFirms.map((firm, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-6 py-4  text-sm font-medium text-gray-900">
                          {index+1}
                        </td>
                        <td className="px-6 py-4  text-sm font-medium text-gray-900">
                          {firm.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {firm.specialization}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {firm.location}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {firm.languages}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.size}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.website && (
                            <a href={firm.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              وب‌سایت
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.email}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.phone}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.experience}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.googleReviews}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.legal500 ? 
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              بله
                            </span> : 
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              خیر
                            </span>
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-6 py-4 text-center text-sm text-gray-500">
                        هیچ نتیجه‌ای یافت نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} - شرکت‌های حقوقی دبی</p>
        </div>
      </footer>
    </div>
  );
}

function getLawFirmsData() {
  return[
    {
      "name": "NYK Law Firm (Nasser Yousuf AlKhamis Advocates)",
      "specialization": "Corporate Law, Commercial Transactions, Real Estate, Litigation, Arbitration, Banking and Finance, Family Law, Employment Law, IP, Construction Law, Criminal Law",
      "location": "Latifa Tower, Sheikh Zayed Road, Dubai",
      "languages": "Arabic, English",
      "size": "Medium (10-20 lawyers)",
      "website": "https://nyk.ae",
      "email": "ask@nyk.ae",
      "phone": "+971 4 445 3100",
      "experience": "",
      "googleReviews": "4.9",
      "legal500": true
    },
    {
      "name": "BSA Ahmad Bin Hezeem & Associates LLP",
      "specialization": "Corporate, Commercial, Banking, Insurance, Real Estate, Dispute Resolution, Arbitration",
      "location": "The Vision Tower, Dubai",
      "languages": "Arabic, English, French",
      "size": "Large (50+ lawyers)",
      "website": "https://bsabh.com",
      "email": "info@bsabh.com",
      "phone": "+971 4 368 5555",
      "experience": "20+",
      "googleReviews": "4.9",
      "legal500": false
    },
    {
      "name": "Nasser Al Malalla Ghanem Advocates & Legal Consultants",
      "specialization": "Civil, Commercial, Criminal, Family Law, Arbitration",
      "location": "Dubai, UAE The Prime Tower Burj Khalifa street",
      "languages": "Arabic, English, Farsi",
      "size": "Small",
      "website": "https://www.nmlawyers.ae/",
      "email": "Info@nmlawyers.ae",
      "phone": "97148321212",
      "experience": "",
      "googleReviews": "4.5",
      "legal500": false
    },
    {
      "name": "Ashwaq Qaid Advocates",
      "specialization": "Civil, Criminal, Family Law",
      "location": "UAE (exact location not found)",
      "languages": "Arabic",
      "size": "Small",
      "website": "",
      "email": "",
      "phone": "",
      "experience": "",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Abdulshafe & Co Legal Office",
      "specialization": "criminal cases, Anti-money laundering litigation, Intellectual property, Real estate",
      "location": "The Burlington Tower - Business Bay - Dubai",
      "languages": "Arabic, Chinese, Russian",
      "size": "Small",
      "website": "https://abdulshafelegal.com/",
      "email": "info@abdulshafe.com",
      "phone": "+971 555 444",
      "experience": "20+",
      "googleReviews": "4.7",
      "legal500": false
    },
    {
      "name": "Al Shehhi Advocates and Legal Consultants",
      "specialization": "criminal law, rental disputes, and labor law",
      "location": "near the Clock Tower at Riqqa Al Buteen Plaza, Office No. 101, Al Masood Building, Reggat, Al Maktoum Rd - Deira - Dubai",
      "languages": "Arabic",
      "size": "Small",
      "website": "https://www.alshehhilawyer.ae/",
      "email": "info@alshehhilawyer.ae",
      "phone": "+971 4238 4222",
      "experience": "20+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Mohammed Al Dahbashi Advocates & Legal Consultants",
      "specialization": "Construction and Infrastructure Law, Private Client Services, Dispute Resolution, Corporate and Commercial Law, Private Notary Services",
      "location": "Office 1401, 48 Burj Gate Tower, Sheikh Zayed Road, Dubai PO Box 413633, Dubai, UAE",
      "languages": "English, Arabic, Spanish, Swahili, Hindi, Pashto, Persian, Portuguese, Kazakh, Tamil, Albanian, Turkish, French, Urdu, Sinhala, German, Russian, Italian, Malay, Tagalog, Shona, and Soma",
      "size": "Medium (10-20 lawyers)",
      "website": "http://www.adglegal.com/",
      "email": "info@adglegal.com",
      "phone": "+971(0)44412031",
      "experience": "7",
      "googleReviews": "4.8",
      "legal500": true
    },
    {
      "name": "Audiri Vox Intellectual Property Rights Management",
      "specialization": "ANTI-COUNTERFEITING, FRANCHISING, IP VALUATION IP registration",
      "location": "309 Churchill TowerBusiness Bay P.O. Box 415116Dubai - United Arab Emirates",
      "languages": "Arabic, English",
      "size": "Small",
      "website": "https://www.kslegal.ae/en/ceo?utm_source=chatgpt.com",
      "email": "global@audirivox.com",
      "phone": "+971 50 788",
      "experience": "10+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Khadija Soheil Lawyers and Legal Consultants",
      "specialization": "Cases of banks, financials and investment institutions, Litigation (civil - commercial - real estate - criminal - legal - labor)",
      "location": "Address: 214 Sheikh Zayed Road, (Imgate) Building - M Floor - Office No. 4, Dubai, UAE",
      "languages": "Arabic, Farsi",
      "size": "Small",
      "website": "https://www.kslegal.ae/en/ceo?utm_source=chatgpt.com",
      "email": "info@asaadi.ae",
      "phone": "+971 4 343 8885",
      "experience": "20+",
      "googleReviews": "2.8",
      "legal500": false
    },
    {
      "name": "Al Rowaad Advocates & Legal Consultants",
      "specialization": "maritime and transport, corporate, commercial law, family law, banking",
      "location": "The H Office Tower 29th floor, One Sheikh Zayed Road, PO Box 40073, Dubai, United Arab Emirates 4th Floor, Building No. 85, Tawi Shouf Street, Al Nahyan, PO Box 129980, Abu Dhabi",
      "languages": "Arabic, English, French, Russian, Hindi, Urdu, Iranian, and Tagalog",
      "size": "Medium (15-30 lawyers)",
      "website": "http://www.alrowaad.ae",
      "email": "info@alrowaad.ae",
      "phone": "+971 4 325 4000",
      "experience": "20+",
      "googleReviews": "5",
      "legal500": false
    },
    {
      "name": "Ahmad Al Madani Advocates & Legal Consultants",
      "specialization": "Litigation, Legal Consulting, Corporate Law, Company Formation, Document Drafting",
      "location": "Business Bay, Dubai",
      "languages": "Arabic, English",
      "size": "Small (5-10 lawyers)",
      "website": "https://www.almadaniadvo.com",
      "email": "info@almadaniadvo.com",
      "phone": "+971 4 250 0045",
      "experience": "",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Al Sharif Advocates & Legal Consultants",
      "specialization": "Arbitration, Corporate Law, Criminal Law, IP & Trademark Law, IT Law, Maritime Law, Labour Law",
      "location": "48 Burj Gate, 7th Floor, Sofitel Hotel Downtown, Sheikh Zayed Road, Dubai, UAE",
      "languages": "Arabic, English, German, Turkish, Farsi",
      "size": "Medium (10-20 lawyers)",
      "website": "http://www.dubailaw.com",
      "email": "dubailaw@emirates.net.ae",
      "phone": "+971 4 348 8808",
      "experience": "40+",
      "googleReviews": "4.8",
      "legal500": false
    },
    {
      "name": "Ibrahim Al Banna Advocates & Legal Consultants",
      "specialization": "Cyber Crime, Tax Law, Financial Crimes & Fraud, Arbitration, Corporate Structuring & Business Setup, Maritime Law, Wills and Probate",
      "location": "Sheikh Zayed Road, Office 402–403, Dubai, UAE",
      "languages": "French, English, Arabic, and Russian",
      "size": "Medium",
      "website": "http://www.albannaadvocates.com",
      "email": "info@albannaadvocates.com",
      "phone": "+971 4 344 4210",
      "experience": "9 years",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Trench & Associates DMCC",
      "specialization": "Corporate Law, Private Wealth – Wills, Inheritance, and Estate Planning, Structures, Trusts, and Foundations, Real Estate, Litigation and Arbitration",
      "location": "701 & 712, Preatoni Tower (previously Dubai Star), Cluster L, Jumeirah Lake Towers, PO Box 21832, Dubai, United Arab Emirates",
      "languages": "English, Arabic, Russian",
      "size": "Small to Medium",
      "website": "http://www.trenchlaw.com",
      "email": "ct@trenchlaw.com",
      "phone": "+971 4 355 3146",
      "experience": "20+",
      "googleReviews": "4",
      "legal500": false
    },
    {
      "name": "Faisal Alzarooni Advocates",
      "specialization": "Violent Crimes, Drug Crimes, Theft Crimes, Financial Crimes",
      "location": "Clover Bay Tower, Office 301, Marasi Drive, Business Bay, Dubai, UAE",
      "languages": "Arabic, English, Tagalog, Farsi, Spanish",
      "size": "Small",
      "website": "http://www.faisalalzarooni.com",
      "email": "info@faisalalzarooni.com",
      "phone": "+971 4 513 5166",
      "experience": "10+",
      "googleReviews": "4.4",
      "legal500": false
    },
    {
      "name": "Al Matrooshi Advocates and Legal Consultants",
      "specialization": "Civil Cases, Criminal Cases, Commercial Law, Corporate Law, Family Law, Intellectual Property, Real Estate Development drafting of contracts, Arbitration and Litigation, Alternative Dispute Resolution, Legal Documentation, Business Set up in UAE, Immigration, Personal Injury Clinical Negligence, Employment Law",
      "location": "Al Harthy Building, Office 401, Floor 4, Al Mina Road, Bur Dubai, Dubai PO Box 34143, Dubai, UAE",
      "languages": "Arabic, English, Hindi, and Urdu",
      "size": "Small to Medium",
      "website": "https://www.advocatesuae.com/",
      "email": "info@advocatesuae.com",
      "phone": "+971(0)43930039",
      "experience": "10+",
      "googleReviews": "4.5",
      "legal500": false
    },
    {
      "name": "Al Tamimi & Company",
      "specialization": "Technology, Media & Telecommunication, Construction & Infrastructure, Real Estate, Intellectual Property, Corporate & Commercial, Derivatives, Banking & Finance, Arbitration & Litigation",
      "location": "Dubai International Financial Centre 6th Floor, Building 4 East DIFC Sheikh Zayed Road PO Box 9275 Dubai, UAE",
      "languages": "multiple languages",
      "size": "Large (50+ lawyers)",
      "website": "https://www.tamimi.com/ae-en/",
      "email": "info@tamimi.com",
      "phone": "Dubai: +971(4)331 7161 Abu Dhabi: +971(2)8130444",
      "experience": "30+",
      "googleReviews": "4.5",
      "legal500": true
    },
    {
      "name": "Bin Suwaidan Advocates and Legal Consultants",
      "specialization": "Trademark Registration, Dispute Resolution, Maritime Law, Corporate, Arbitration, Banking & Finance, Oil & Gas, Criminal Cases, Labour Of Employment, Real Estate & Construction, Insurance, Sport Law, Merges & Acquisitions, Personal Affairs Law, Civil Cases, E-Commerce & E-Contracts",
      "location": "Dubai: Jumeirah Road, Al Hudaiba Awards Buildings, Block B Office 406, Dubai PO Box 50229 Dubai, UAE Abu Dhabi: Dalma Road, Behind Commercial Court Building C54, Office 1103, Abu Dhabi, PO Box 36104, Abu Dhabi, UAE",
      "languages": "multiple languages",
      "size": "Large (50+ lawyers)",
      "website": "http://www.binsuwaidan.com/",
      "email": "info.dxb@binsowaidan.ae  info.auh@binsowaidan.ae",
      "phone": "Dubai: +971(0)43258888 Abu Dhabi: +971(0)24913111",
      "experience": "10+",
      "googleReviews": "5",
      "legal500": false
    },
    {
      "name": "Dentons & Co",
      "specialization": "Bankruptcy, Corporate, Employment, Intellectual property, International, Real estate",
      "location": "Dubai: Burj Khalifa District, Level 18, Boulevard Plaza 2 – Dubai PO Box 1756, Dubai, UAE Abu Dhabi: Level 4, Trade Centre, West Tower Abu Dhabi Mall PO Box 47656, Abu Dhabi, UAE",
      "languages": "multiple languages",
      "size": "Large (50+ lawyers)",
      "website": "https://www.dentons.com/en",
      "email": "Dubai@dentons.com",
      "phone": "Dubai: +971(0)44020800 Abu Dhabi: +971(0)26131500",
      "experience": "50+",
      "googleReviews": "5",
      "legal500": true
    },
    {
      "name": "Hadef & Partners",
      "specialization": "Banking & Finance, Commercial, Corporate, Data Protection, Dispute Resolution, Employment, Engineering & Construction, Financial Services, Information And Communications Technology (ICT), Insurance, Intellectual Property, Maritime",
      "location": "Dubai: Emaar Sq, Building 3, Level 5, Downtown Dubai PO Box 37172, Dubai, UAE Abu Dhabi: Hadef & Partners 12th Floor, The Blue Tower Sheikh Khalifa Street, Abu Dhabi",
      "languages": "Arabic, English, French, Hindi, Russian, and Urdu",
      "size": "Large (50+ lawyers)",
      "website": "http://www.hadefpartners.com/",
      "email": "info@hadefpartners.com",
      "phone": "Dubai:+971(0)44292999 AbuDhabi:971(0)26276556",
      "experience": "40",
      "googleReviews": "4.7",
      "legal500": true
    },
    {
      "name": "Hamdan AlShamsi Lawyers & Legal Consultants",
      "specialization": "Bankruptcy, Corporate, Criminal, Employment, Family, Health, Immigration, Intellectual property, International, Maritime, Personal injury, Real estate, Tax",
      "location": "Office 107, Building 7, Business Bay Square, Marasi Drive, Business Bay, Dubai PO Box 116564, Dubai, UAE",
      "languages": "Arabic, English",
      "size": "Medium (15-30 lawyers)",
      "website": "http://www.alshamsilegal.com/",
      "email": "info@alshamsilegal.com",
      "phone": "97143469262",
      "experience": "10+",
      "googleReviews": "4.4",
      "legal500": true
    },
    {
      "name": "Hani Al Jasmi Advocates & Legal Consultants",
      "specialization": "Bankruptcy, Corporate, Criminal, Employment, Intellectual property, International, Maritime, Personal injury, Real estate",
      "location": "Office M04, Liberty Building, Near Sharjah Bank, Al Garhoud, Dubai PO Box 123887, Dubai, UAE",
      "languages": "Arabic, English, French, Farsi, Malayalam, Filipino, Urdu, Hindi, and Punjabi",
      "size": "Large (50+ lawyers)",
      "website": "http://www.aljasmilaw.com/",
      "email": "info@aljasmilaw.com",
      "phone": "97142957744",
      "experience": "10+",
      "googleReviews": "4.6",
      "legal500": false
    },
    {
      "name": "James Berry & Associates Legal Consultants",
      "specialization": "Bankruptcy, Corporate, Criminal, Employment, Family, Immigration, Intellectual property, International, Personal injury, Real estate, Mergers and Acquisitions, Debt Recovery, Data Privacy",
      "location": "API World Tower, P.O. Box 52294, Sheikh Zayed Road, Dubai PO Box 52294, Dubai, UAE",
      "languages": "English, French, Gujarati, Hindi, Urdu, Arabic",
      "size": "Medium (15-30 lawyers)",
      "website": "https://www.jamesberrylaw.com/",
      "email": "enquiries@jamesberrylaw.ae",
      "phone": "+971(0)43317552",
      "experience": "30+",
      "googleReviews": "4.5",
      "legal500": false
    },
    {
      "name": "Trowers & Hamlins",
      "specialization": "Corporate, Project financing and development, Representation in arbitration and litigation, Contract drafting and negotiation, Regulatory compliance and governance, Mergers and acquisitions, Intellectual property protection, Estate planning and wealth management",
      "location": "Dubai: Office 2403, Level 24, Boulevard Plaza Tower 2, Downtown PO Box 23092, Dubai, UAE Abu Dhabi: Office 3103, Floor 31 Shining Towers Mubarak Bin Mohammed Street PO Box 37021, Abu Dhabi, UAE",
      "languages": "Arabic, English, French",
      "size": "Large (50+ lawyers)",
      "website": "https://www.trowers.com/",
      "email": "E-mail Dubai: dubai@trowers.com E-mail Abu Dhabi: abudhabi@trowers.com",
      "phone": "Dubai: +971(0)43025100 Abu Dhabi: +971(0)24107600",
      "experience": "30+",
      "googleReviews": "",
      "legal500": true
    },
    {
      "name": "TWS Legal Consultants DMCC",
      "specialization": "Corporate, Employment, Family, Intellectual property, Real estate, DIFC Corporate Services, Wills & Estate Inheritance, Family & Divorce Law, Immigration Law",
      "location": "33rd Floor, Oaks Liwa Heights Tower – Cluster W, Jumeirah Lakes Towers, Dubai PO Box 17317, Dubai, UAE",
      "languages": "",
      "size": "Medium (15-30 lawyers)",
      "website": "https://www.willsuae.com/",
      "email": "info@twslegal.ae",
      "phone": "+971(0)44484284",
      "experience": "10+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Ahmad Al Madani Advocates & Legal Consultants",
      "specialization": "Bankruptcy; Corporate; Criminal; Employment; Family; Health; Intellectual property; Personal injury; Real estate; Legal consultants",
      "location": "Dubai Business Bay, Al Asayel St, No.D72 near to Bay Square . Tamani Arts Office Building – Level P4 – Office PR2",
      "languages": "Arabic & English",
      "size": "",
      "website": "https://www.almadaniadvo.com/",
      "email": "info@almadaniadvo.com",
      "phone": "+971(4)2500045",
      "experience": "",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Al Reyami Advocates & Muhyealdeen International Legal Consultants",
      "specialization": "Commercial and Corporate Transactions, Mergers and Acquisitions, Maritime Contracts, Sustainable and Renewable Energy Contracts, Oil and Gas Contracts, Interim Trade Transaction Contracts, Liquidation, Bankruptcy and Insolvency, ADR, Arbitration International and Domestic, DIFC Courts and Small Claims Tribunal, Civil Disputes Cross Border and Domestic, Criminal Disputes International and Domestic, Extradition Cases, Abduction & Family Law Cases, Interpol Cases, Travel Ban, Arrest Warrant Orders, Succession, Wills, Labour and Employment Dispute, Real Estate and Property Law, Company Incorporation, Banking, Debt Collection ( NO WIN - NO FEE), Insurance Law, Virtual Assets Law",
      "location": "Suite 2406, Grosvenor Tower, Barsha Heights, Dub",
      "languages": "Arabic, English, French, Hindi, Russian Tagalog Armenian, and Malayalam",
      "size": "Medium (15-30 lawyers)",
      "website": "http://www.alriyamiadvocates.com/",
      "email": "info@alriyamiadvocates.com",
      "phone": "Tel: +971 4 4534188 Fax: +971 4 4534189",
      "experience": "20+",
      "googleReviews": "4.6",
      "legal500": false
    },
    {
      "name": "Baker McKenzie Habib Al Mulla",
      "specialization": "Corporate and Commercial Law, Banking and Finance, Dispute Resolution, Real Estate, Compliance and Investigations",
      "location": "Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah, Umm Al Quwain Level 14, O14 Tower, Al Abraj Street, Business Bay, P.O. Box 2268, Dubai",
      "languages": "Arabic, English",
      "size": "Medium (15-30 lawyers)",
      "website": "http://www.bakermckenzie.com/",
      "email": "Mohamed.Elbaghdady@bakermckenzie.com Mohamed.Elkhatib@bakermckenzie.com",
      "phone": "Tel: +971 4 4230079 Fax: +971 4 4479777",
      "experience": "40+",
      "googleReviews": "4.3",
      "legal500": true
    },
    {
      "name": "Fahad Abdullah Advocates & Legal Consultants",
      "specialization": "Criminal cases, Family / Divorce cases, Company Retainer Law firm, Compensation, Real Estate, Petroleum, maritime law, transportation",
      "location": "Office 308, Busahqer Building, near GGICO Metro Station, Opposite Ajman Bank, Al Garhoud, Dubai",
      "languages": "Arabic, English",
      "size": "Medium (10-20 lawyers)",
      "website": "http://www.lawyer-uae.com/",
      "email": "info@lawyer-uae.com",
      "phone": "Tel: +971 4 2581313",
      "experience": "10+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "International Advocate Legal Services",
      "specialization": "Family Law, Employment Law, Commercial Law, Civil Law, Arbitration",
      "location": "Office No. 603 Maze Tower, Sheikh Zayed Road, Bur Dubai, P.O. Box 10223, Dubai",
      "languages": "English, French, Arabic",
      "size": "Small",
      "website": "http://www.ials.ae/",
      "email": "info@ials.ae",
      "phone": "Tel: +971 4 2733029 Fax: +971 4 2733027",
      "experience": "10+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Meyer-Reumann & Partners",
      "specialization": "Company, Commercial, Labour, Family, Real Estate, Intellectual Property Law, Offshore, Will & Probate Registry – Saudi & Egyptian Litigation, Investment Law, Tax Law, Offshore Vehicles, Banking and Finance",
      "location": "World Trade Centre, Level 13 Sheikh Rashid Tower, Sheikh Zayed Road, P.O. Box 9353, Dubai",
      "languages": "German, English, Italian, Arabic",
      "size": "Medium (15-30 lawyers)",
      "website": "http://www.meyer-reumann.com/",
      "email": "dubai@meyer-reumann.com",
      "phone": "Tel: +971 4 3317110 Fax: +971 4 3313832",
      "experience": "30+",
      "googleReviews": "4.5",
      "legal500": false
    },
    {
      "name": "Mohamed Eid Alsowaidi Advocates & Legal Consultants",
      "specialization": "Civil, Family, Commercial, Drugs, Criminal, Property & Real Estate, Money Laundering, Rehabilitation, Cassation, L.L.C Company, Appeal, Immigration & Employment, Inheritance Law, Cybercrime Litigation, Extradite, Traffic Law, Banking & Finance, Arbitration & Conciliation, Rogatory, Rent Disputes, and other cases",
      "location": "Office No. 104, Arcada Building, Al Garhoud, Dubai",
      "languages": "Arabic, English, Russian, Indian, Filipino, Ukrainian, Turkish, Armenian",
      "size": "Medium (10-20 lawyers)",
      "website": "",
      "email": "mealsuwaidi@hotmail.com",
      "phone": "",
      "experience": "20+",
      "googleReviews": "4",
      "legal500": false
    },
    {
      "name": "Mohammed Yousuf Advocates and Legal Consultants",
      "specialization": "Litigation, Legal Consultants, Certifying Documents, Criminal, Drafting Legal Documents, Law, Family Law, Child Custody, Divorce, Banking, Financial, labour and employment law, Commercial/Business Law, Civil Law, Contracts, Corporation, Arbitration, IT Law, Intellectual Property & Trademark, Labor Law, Maritime Law",
      "location": "Business Avenue Building, Office #720 AL Saqr Real Estate Management - Deira-Port Saeed, Dubai - Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaima, Umm Al Quwain",
      "languages": "Arabic, English, Urdu, and Hindi",
      "size": "Small (5-10 lawyers)",
      "website": "",
      "email": "info@myadvocates hassan.morshdy@myadvocates.ae",
      "phone": "Tel: +971 4 3544588 Tel: +971 504955536",
      "experience": "20+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Rashid Al Kaitoob Advocates & Legal Consultants",
      "specialization": "Insolvency & Bankruptcy Law, Healthcare Law, Aviation Law, Business Setup, Contract Drafting & Reviewing, Banking Litigation, Arbitration, Tax Dispute & Litigation Arbitration Disputes related to commercial, financial, personal, civil, taxation, & maritime law matters. Provides notarial services & interpretation services",
      "location": "Saeed Tower 2, Sheikh Zayed Road, Dubai Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah, Umm Al Quwain",
      "languages": "Arabic, English",
      "size": "Small (5-10 lawyers)",
      "website": "http://www.rkadvocate.com/",
      "email": "rashid@rkadvocates.com info@rkadvocates.com",
      "phone": "Tel: +971 4 3595552 Fax: +971 4 3595955",
      "experience": "20+",
      "googleReviews": "4.8",
      "legal500": false
    },
    {
      "name": "The Law Offices of Faisal Alzarooni",
      "specialization": "Criminal Law Offers free in-person 30-minute consultations by appointment. If the client is detained, consultations are available by phone",
      "location": "Office 301 Clover Bay Tower, Al Abraj Street, Business Bay, Dubai Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah, Umm Al Quwain",
      "languages": "Arabic, English, Spanish, Tagalog, Farsi",
      "size": "Small (5-10 lawyers)",
      "website": "http://www.faisalalzarooni.com/",
      "email": "info@faisalalzarooni.com",
      "phone": "Tel: +971 4 5135166",
      "experience": "10+",
      "googleReviews": "4.4",
      "legal500": false
    },
    {
      "name": "Afridi & Angell",
      "specialization": "Banking and Financial Services, Corporate and Commercial, Dispute Resolution, Financial Services Regulation, Private Equity and Acquisitions, Maritime Shipping and Transportation, Real Estate and Construction, Dubai International Financial Centre Employment, Infrastructure and Project Finance, Military Procurements and Offsets",
      "location": "The Towers at the Trade Center, West Tower, Level 12 PO Box 3691, Abu Dhabi UAE",
      "languages": "Arabic, Urdu, French English-extensive",
      "size": "Medium (15-30 lawyers)",
      "website": "https://afridi-angell.com/",
      "email": "abudhabi@afridi-angell.com",
      "phone": "971 2 627 2905 -971 2 610 1010",
      "experience": "40+",
      "googleReviews": "4.6",
      "legal500": true
    },
    {
      "name": "Ali H Ghosheh",
      "specialization": "Commercial Law",
      "location": "Suite 1002, 10th floor, The Blue Tower, Khalifa Street, PO Box 767, Abu Dhabi, UAE",
      "languages": "English (extensive) Arabic",
      "size": "",
      "website": "",
      "email": "aghsosheh@ghosheh.ae",
      "phone": "02-627-2323",
      "experience": "50+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "AL MAHROUS ADVOCATES & LEGAL CONSULTANCY",
      "specialization": "Criminal Civil Commercial Family Status Labor Property & Real Estate and Corporate",
      "location": "Abu Dhabi, Zayed the 1st street, GTH building, 9th floor, apt 902.903.904",
      "languages": "English (extensive) Arabic, Urdu, French, Russian",
      "size": "Large (50+ lawyers)",
      "website": "https://mahrousco.com/",
      "email": "m.ayad@almahrousadvocates.ae",
      "phone": "97126282392 97126282624",
      "experience": "20+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "AL JASHANI ADVOCATES & LEGAL ADVISORS",
      "specialization": "Family Law Child Custody Parental Child Abduction Child Protection Marriage/Divorce Insurance Banking/Financial Commercial/ Business Law Foreign Investments Marketing Agreements Patents/Trademarks/Copyrights Civil Law Criminal Law Damages Narcotics Collections Commercial Law Corporations Aeronautical/Maritime Foreign Claims Estates Government relations Labor relations Auto/accidents",
      "location": "Level 7, 704, Al Ghaith Tower, Hamdan Street, PO Box 34815, Abu Dhabi, UAE",
      "languages": "English (extensive) Arabic, English, Spanish",
      "size": "",
      "website": "",
      "email": "info@aljashani.com",
      "phone": "97126777737 --97126724306",
      "experience": "30+",
      "googleReviews": "5",
      "legal500": false
    },
    {
      "name": "Baitulhikma Law Firm",
      "specialization": "Civil and Commercial Litigation, alternative dispute resolution, corporate-commercial, banking and finance, employment law, property and real estate, construction, insurance, criminal law other valued services: witnessing of oaths and certification of document",
      "location": "1701, 17th Floor, Addax Tower, Reem Island, Abu Dhabi UAE, PO Box 7",
      "languages": "Ahmad Subhi Ahmad: English (extensive), Arabic, Azeri, French Mohammad Ahmad: English (extensive), Azeri, Turkish",
      "size": "Medium (15-30 lawyers)",
      "website": "https://www.baitulhikma.com/",
      "email": "ahmad.subhi@baitulhikma.com",
      "phone": "02-626-8245 02-627-5685",
      "experience": "30+",
      "googleReviews": "4.3",
      "legal500": false
    },
    {
      "name": "EZZ Law Firm",
      "specialization": "Family, divorce, criminal, corporate, construction, real estate, property, banking, insurance, labor, maritime law",
      "location": "Mina Street, Union National Bank building second floor, Office 203",
      "languages": "English-Extensive Arabic-Extensive",
      "size": "",
      "website": "https://ezz4law.com/",
      "email": "ez@4l.biz",
      "phone": "971503159583",
      "experience": "40+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "HPL Yamalova & Plewka DMCC",
      "specialization": "Criminal Law Family & Personal Status Law Corporate & Commercial Law Company Formations Employment Law Real Estate Law Immigration Dispute Resolution & Litigation Restructuring & Liquidation Aviation Law Attestations",
      "location": "Unit 1805, Reef Tower, Cluster O, JLT, Dubai",
      "languages": "English, Arabic & Russian",
      "size": "Medium (15-30 lawyers)",
      "website": "https://lylawyers.com/",
      "email": "info@lylawyers.com",
      "phone": "971 4 427 98 12 & +971 52 525 I43",
      "experience": "10+",
      "googleReviews": "4.9",
      "legal500": false
    },
    {
      "name": "Huqooq Legal Practice (HLP)",
      "specialization": "Corporate Law Civil Law",
      "location": "Grosvenor Tower, Offices 2307-2308, Sheikh Zayed Road, Dubai, UAE",
      "languages": "Arabic, English (extensive), French",
      "size": "Medium (15-30 lawyers)",
      "website": "https://www.hlplawfirm.net/",
      "email": "badih.moukarzel@hlplawfirm.com",
      "phone": "971 4 329 6968",
      "experience": "20+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "Nayef Abu Sakran",
      "specialization": "Intellectual Property Laws, Commercial/Business Law, US Taxation Matters for US Expatriates, Banking/Financial Matters",
      "location": "Diera Tower Office 301 A, Abu Dhabi, UAE",
      "languages": "English (fluent) Arabic, French",
      "size": "",
      "website": "",
      "email": "nascoint@hotmail.com",
      "phone": "00971-50-564-0056",
      "experience": "60+",
      "googleReviews": "",
      "legal500": false
    },
    {
      "name": "PWC Legal Middle East",
      "specialization": "Commercial/Business Law Commercial Law Contracts Corporations Government Relations Labor Relations Immigration",
      "location": "Emaar Square Building 5, level 3 – P.O. Box 11987",
      "languages": "English – Arabic – Hindi - Urdu",
      "size": "Large (50+ lawyers)",
      "website": "https://www.pwc.com/m1/en/services/tax/legal-services.html",
      "email": "Anir.chatterji@pwc.com",
      "phone": "971558761249",
      "experience": "10+",
      "googleReviews": "",
      "legal500": true
    },
    {
      "name": "STA Law Firm Limited",
      "specialization": "Public Listing and Capital Services, Foreign Investments and Takeovers, Corporate Governance, Mergers and Acquisitions, Other Matters Family Divorce Criminal Corporate Construction Real estate Property Banking Insurance Labor Maritime law",
      "location": "23 A, Tamouh Tower Marina Square, Reem Island, Abu Dhabi UAE 3517, Al Maqam Tower, Abu Dhabi Global Markets Square, Abu Dhabi UAE",
      "languages": "Arabic, English (extensive), French chaina russa",
      "size": "Large (50+ lawyers)",
      "website": "https://www.stalawfirm.com/en.html",
      "email": "corporate@stalawfirm.com",
      "phone": "971 2 6444 330",
      "experience": "",
      "googleReviews": "",
      "legal500": true
    },
    {
      "name": "Mena Chambers",
      "specialization": "Commercial Law, Corporate Law, Arbitration, Commercial Disputes, Contracts",
      "location": "Dubai, Abu Dhabi",
      "languages": "Arabic, English",
      "size": "Medium (15-30 lawyers)",
      "website": "https://menachambers.com/",
      "email": "info@menachambers.com",
      "phone": "+971 4 343 4214",
      "experience": "10+",
      "googleReviews": "4.8",
      "legal500": true
    },
    {
      "name": "Clarke & Swann",
      "specialization": "Tax Law, Commercial Law, Arbitration, Intellectual Property",
      "location": "Dubai, Abu Dhabi",
      "languages": "Arabic, English",
      "size": "Large (50+ lawyers)",
      "website": "https://clarkeswann.com/",
      "email": "info@clarkeswann.com",
      "phone": "+971 4 300 0544",
      "experience": "15+",
      "googleReviews": "4.7",
      "legal500": true
    },
    {
      "name": "Harney Westwood & Riegels",
      "specialization": "Maritime Law, Contracts, Corporate Law, Commercial Law, Financial Law, Intellectual Property",
      "location": "Dubai, Abu Dhabi",
      "languages": "Arabic, English, French",
      "size": "Large (50+ lawyers)",
      "website": "https://harneys.com/",
      "email": "info@harneys.com",
      "phone": "+971 4 369 0346",
      "experience": "20+",
      "googleReviews": "4.9",
      "legal500": true
    },
    {
      "name": "K&L Gates",
      "specialization": "Commercial Law, International Law, Arbitration, Banking Law, Financial Law",
      "location": "Dubai",
      "languages": "English, Arabic",
      "size": "Large (50+ lawyers)",
      "website": "https://klgates.com/",
      "email": "info@klgates.com",
      "phone": "+971 4 340 7800",
      "experience": "10+",
      "googleReviews": "4.8",
      "legal500": true
    },
    {
      "name": "White & Case",
      "specialization": "Corporate Law, Arbitration, International Law, Contracts",
      "location": "Dubai, Abu Dhabi",
      "languages": "Arabic, English",
      "size": "Large (50+ lawyers)",
      "website": "https://whitecase.com/",
      "email": "info@whitecase.com",
      "phone": "+971 4 381 8600",
      "experience": "20+",
      "googleReviews": "4.9",
      "legal500": true
    },
    {
      "name": "Linklaters",
      "specialization": "Corporate Law, Arbitration, Financial Law, Banking Law",
      "location": "Dubai",
      "languages": "Arabic, English",
      "size": "Large (50+ lawyers)",
      "website": "https://linklaters.com/",
      "email": "info@linklaters.com",
      "phone": "+971 4 372 1245",
      "experience": "20+",
      "googleReviews": "4.8",
      "legal500": true
    },
    {
      "name": "Hogan Lovells",
      "specialization": "Commercial Law, Arbitration, Financial Law, International Law",
      "location": "Dubai",
      "languages": "Arabic, English",
      "size": "Large (50+ lawyers)",
      "website": "https://hoganlovells.com/",
      "email": "info@hoganlovells.com",
      "phone": "+971 4 225 7467",
      "experience": "30+",
      "googleReviews": "4.9",
      "legal500": true
    },
    {
      "name": "Allen & Overy",
      "specialization": "Corporate Law, Commercial Law, Banking and Financial Law, Arbitration, Intellectual Property",
      "location": "Dubai, Abu Dhabi",
      "languages": "Arabic, English",
      "size": "Large (50+ lawyers)",
      "website": "https://allenovery.com/",
      "email": "info@allenovery.com",
      "phone": "+971 4 424 8500",
      "experience": "25+",
      "googleReviews": "5",
      "legal500": true
    },
    {
      "name": "Baker Botts",
      "specialization": "Commercial Law, Arbitration, International Law, Banking Law, Energy Law",
      "location": "Dubai",
      "languages": "Arabic, English",
      "size": "Large (50+ lawyers)",
      "website": "https://bakerbotts.com/",
      "email": "info@bakerbotts.com",
      "phone": "+971 4 702 6800",
      "experience": "10+",
      "googleReviews": "4.7",
      "legal500": true
    }
];
}