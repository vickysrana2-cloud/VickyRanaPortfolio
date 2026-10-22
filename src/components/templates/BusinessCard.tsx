"use client";

import React from "react";
import {
  FaInstagram as Instagram,
  FaLinkedin as Linkedin,
  FaWhatsapp as Whatsapp,
} from "react-icons/fa6";
import { Globe, Mail, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EcardProfile({ data }: { data?: any }) {
  console.log("Received data:", data);

  const basicInfo = data?.basicInfo || {};
  const contactInfo = data?.contactInfo || {};
  const socialInfo = data?.socialInfo || {};

  const companyName =
    basicInfo.companyName || "Dextero Business Solutions Pvt Ltd";
  const companyLogo =
    basicInfo.logo || "https://about.dextero.in/assets/images/dextero.jpg";
  const companyWebsite = basicInfo.website || "https://www.dextero.in";

  const profileName = basicInfo.name || "Sanjay Shetty";
  const profileTitle = basicInfo.title || "Director";
  const profileImage =
    basicInfo.image ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOlG-rXp07etmMH99wHXewGgLlBBktA6T6M-bHY7C_aGMSKLtpmXIZXY&s=10";
  const profileCompany = basicInfo.company || companyName;

  const cardBackgroundImage =
    basicInfo.cardBg ||
    "https://media.istockphoto.com/id/1150186246/vector/abstract-blue-square-background.jpg?s=612x612&w=0&k=20&c=L95uLuJPoP4b3W8hGJ6B7hz1-ar2MQ0l0CY5lIHz_Nc=";
  const cardLogo = basicInfo.cardLogo || companyLogo;

  const contactEmail = contactInfo.email || "sanjay.shetty@dextero.in";
  const contactPhone = contactInfo.phone || "+91 98196 09773";
  const contactWhatsapp = contactInfo.whatsapp || "+91 98196 09773";
  const contactWebsite = contactInfo.website || companyWebsite;

  const primaryColor = contactInfo.primary || "#1f3b8b";

  const instagramUrl = contactInfo.instagram || "";
  const linkedinUrl = contactInfo.linkedin || "";

  return (
    <div className="h-auto pb-5 bg-white text-gray-800 font-sans relative overflow-x-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] md:w-[110%] h-26 md:h-34 rounded-b-[100%] -z-0"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="max-w-md mx-auto pt-10 md:pt-20 px-4 flex flex-col items-center relative z-10">
        <div className="w-full bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray overflow-hidden relative p-6 aspect-[1.7/1] flex flex-col justify-between">
          <Image
            src={cardBackgroundImage}
            alt="Card Background"
            fill
            className="object-cover object-center z-0"
            priority
            unoptimized
          />

          <div className="flex items-center space-x-2 z-10">
            <Image
              width={120}
              height={120}
              src={cardLogo}
              alt="Logo"
              className=""
              unoptimized
            />
          </div>

          <div className="z-10">
            <h2 className="text-xl font-normal text-gray-900 leading-tight">
              {profileName}
            </h2>
            <p className="text-sm text-gray-700 font-normal mt-0.5">
              {profileTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-8 w-full px-2">
          <Image
            width={80}
            height={80}
            unoptimized
            src={profileImage}
            alt={profileName}
            className="w-20 h-20 rounded-full object-cover shadow-md border border-gray-100 shrink-0"
          />
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-snug">
              {profileName}
            </h1>
            <p className="text-sm text-gray-700 font-normal leading-tight mt-0.5 max-w-50">
              {profileCompany}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-left gap-2.5 mt-6 w-full px-1">
          <span className="flex py-2.5 px-4 gap-3 items-center bg-white border border-gray-200/80 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-normal text-sm text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all text-center cursor-pointer">
            Let's connect{" "}
            <span>
              <ArrowRight
                height={15}
                width={15}
                style={{ color: primaryColor }}
              />
            </span>
          </span>

          {instagramUrl && (
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white border border-gray-200/80 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center justify-center shrink-0 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 stroke-[1.5]" />
            </Link>
          )}

          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white border border-gray-200/80 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center justify-center shrink-0 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 stroke-[1.5]" />
            </Link>
          )}
        </div>

        <div className="w-full mt-8 px-2">
          <div className="flex items-center space-x-3.5 py-4 border-b border-gray-200/60">
            <Globe
              className="w-5 h-5 shrink-0 stroke-[1.75]"
              style={{ color: primaryColor }}
            />
            <Link
              href={contactWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-base text-gray-900 hover:text-blue-600 font-normal truncate"
            >
              {contactWebsite.replace("https://", "").replace("http://", "")}
            </Link>
          </div>

          <div className="py-4 border-b border-gray-200/60 flex items-start space-x-3.5">
            <Mail
              className="w-5 h-5 shrink-0 stroke-[1.75] mt-0.5"
              style={{ color: primaryColor }}
            />
            <div className="flex flex-col">
              <Link
                href={`mailto:${contactEmail}`}
                className="text-base text-gray-900 hover:text-blue-600 font-normal break-all"
              >
                {contactEmail}
              </Link>
              <Link
                href={`mailto:${contactEmail}`}
                className="text-xs text-gray-700 underline mt-1 hover:text-blue-600 w-fit"
              >
                Mail Now
              </Link>
            </div>
          </div>

          <div className="py-4 border-b border-gray-200/60 flex items-start space-x-3.5">
            <Phone
              className="w-5 h-5 shrink-0 stroke-[1.75] mt-0.5"
              style={{ color: primaryColor }}
            />
            <div className="flex flex-col">
              <Link
                href={`tel:${contactPhone}`}
                className="text-base text-gray-900 hover:text-blue-600 font-normal"
              >
                {contactPhone}
              </Link>
              <Link
                href={`tel:${contactPhone}`}
                className="text-xs text-gray-700 underline mt-1 hover:text-blue-600 w-fit"
              >
                Call Now
              </Link>
            </div>
          </div>

          <div className="py-4 flex items-start space-x-3.5">
            <Whatsapp
              className="w-5 h-5 shrink-0 stroke-[1.75] mt-0.5"
              style={{ color: primaryColor }}
            />
            <div className="flex flex-col">
              <Link
                href={`https://wa.me/${contactWhatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-base text-gray-900 hover:text-blue-600 font-normal"
              >
                {contactWhatsapp}
              </Link>
              <Link
                href={`https://wa.me/${contactWhatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-700 underline mt-1 hover:text-blue-600 w-fit"
              >
                Message Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      {contactWhatsapp && (
        <Link
          href={`https://wa.me/${contactWhatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            `Hello ${profileName}, I'd like to get in touch.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <Whatsapp className="text-3xl" />
        </Link>
      )}
    </div>
  );
}
