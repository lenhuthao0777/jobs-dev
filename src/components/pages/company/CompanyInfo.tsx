import React, { FC } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

import image from "@/public/company.jpeg";
import Button from "@/components/ui/Button";

const CompanyInfo: FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h2 className="text-xl font-semibold">About company</h2>
      <div className="flex items-center justify-between">
        <div className=" flex items-center">
          <Image
            src={image}
            width={64}
            height={64}
            alt="img"
            className="mt-5 overflow-hidden rounded-lg"
          />
          <p className="flex flex-col ml-3 text-sm">
            <span className="font-semibold">JAC Recruitment</span>
            <span>221,722 followers</span>
          </p>
        </div>
        <Button variant="subtle">
          <Plus size={14} className="mr-1" />
          Follow
        </Button>
      </div>
      <p className="mt-5 text-xs">
        Staffing & Recruiting 1,001-5,000 employees 2,152 on LinkedIn
      </p>

      <p className="text-xs mt-3 text-gray-500">
        JAC Recruitment, listed on the first section of the Tokyo Stock
        Exchange, is one of the very few recruitment consultancies providing
        specialised services for medium-to-high-income job positions such as
        specialists, middle management positions and executives. The Group has
        over 45 years of history since its foundation in 1975 in the United
        Kingdom. Its Japanese subsidiary was opened in 1988 and has been driving
        the recruitment industry in Japan for over 30 years. We are now
        operating across 29 offices in 12 countries. have a presence in the
        U.S., the United Kingdom, Germany and eight Asian countries (Singapore,
        Malaysia, Indonesia, Thailand, China / Hong Kong SAR, South Korea,
        Vietnam, India). With our global network operating across 12 countries,
        we are contributing to the growth of our client companies’ global
        business expansions by providing services for Japanese, foreign
        capitalized and local company clients. To satisfy the recent increasing
        demand of talent in the latest technology areas such as DX, IoT, AI and
        robots, we are strengthening digital-related recruitment services
        through our brand “JAC Digital” as a company-wide project. From the end
        of 2020, we have started to provide two additional recruitment-related
        services: “Interim Management Solutions (IMS)" specializing in solving
        management issues with the aim of responding to the diverse work style
        needs of high-skilled personnel, and “Recruitment Process Optimisation
        (RPO)" to solve corporate recruitment issues. All of our 1,800 staff
        around the world continue aiming to gain trust and support by our
        customers by improving our service quality.
      </p>
    </div>
  );
};

export default CompanyInfo;
