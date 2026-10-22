import { ChocolateTemplate } from "./chocolate"
import MobileAccessoriesStoreTemplate from "./lightMobile"
import Florist from "./flower"
import TravelAgencyTemplate from "./travelAgency"
import TuitionCoachingTemplate from "./tuitionCoaching"
import { FitnessGymTemplate } from "./fitnessGym"
import HealthcareClinicTemplate from "./HealthCare Clinic"
import { HutchTemplate } from "./Interior-Modified"
import { RealEstateTemplate } from "./Realty-Modified"
import LawFirmTemplate from "./LawFirm"
import BeautySalon from "./beautySalon"
import SportsOutletTemplate from "./sportsOutlet"
import SwarnaJewelryLandingPage from "./Jewellery"
import React from "react"
import Sports from "./Sports";
import YovaYogaStudio from "./yoga"
import PrillyPilatesStudio from "./pilates"
import Trainer from "./QiGongTrainer"
import InteriorHutch from "./Interior-HUTCH"
import LuxuryLandingPage from "./CorporateGiftingTemplate"
import LuminaEventsSPA from "./EventPlanner"
import VoltEdgeSPA from "./ElectricalTemplate"
import LuxeHavenHotel from "./Hotel"
import DriveDrivingSchool from "./DrivingSchool"
import GreenLeafTreeCare from "./TreeServiceTemplate"
import WebDev from "./WebdevelopmentTemplate"
import PaintingStudioTemplate from "./paint"
import RoyaleTouche from "./FloorTemplate"
import BakerTemplate from "./BakeryTemplate"
import CarpentryStudioTemplate from "./carpenter"
import InsuranceLandingPage from "./InsuranceTemplate"
import TaxNestLandingPage from "./CaTaxConsaltantTemplate"
import GlassStudioTemplate from "./glass"
import LuminaTailorsSPA from "./ClothingTemplate"
import EcardProfile from "./BusinessCard"
import GraphicDesignerTemplate from "./GraphicDesigner"
import EventPlanningTemplate from "./EventPlanningTemplate"
import DanceMartial from "./DanceMartial"
import CorporateGiftingTemplate1 from "./CorporateGifting"
import AutoDetailing from "./AutoDetailing"
import FolioTemplate from "./folio"
import NovaStudioTemplate from "./novaStudio"
export const TEMPLATE_REGISTRY: Record<string, React.ComponentType<any>> = {
  "Business Card" : EcardProfile,
  "Clothing" : LuminaTailorsSPA,
  "Glass Maker" : GlassStudioTemplate,
  "Tax Consaltant" : TaxNestLandingPage,
  "Insurance" : InsuranceLandingPage,
  "Carpenter"  :CarpentryStudioTemplate,
  "Baker" : BakerTemplate,
  "Flooring" : RoyaleTouche,
  "Painter" : PaintingStudioTemplate,
  "Web Development" : WebDev,
  "Tree Services": GreenLeafTreeCare,
  "Athletica Studio": SportsOutletTemplate,
  Chocolate: ChocolateTemplate,
  florist: Florist,
  "Mobile Accessories": MobileAccessoriesStoreTemplate,
  "Beauty Salon": BeautySalon,
  "Travel agency": TravelAgencyTemplate,
  "Tuition & Coaching": TuitionCoachingTemplate,
  "Fitness & Gym": FitnessGymTemplate,
  "HealthCare Clinic": HealthcareClinicTemplate,
  "Interior Hutch": InteriorHutch,
  "Hutch Interior": HutchTemplate,
  Reality: RealEstateTemplate,
  "Lawfirm": LawFirmTemplate,
  "Jewellery":SwarnaJewelryLandingPage,
  "Yoga":YovaYogaStudio,
  "Pilates":PrillyPilatesStudio,
  "Qi-Gong Trainer":Trainer,
  "Corporate Gifting":LuxuryLandingPage,
  "Event Planner": LuminaEventsSPA,
  "Electrical Equipment Manufacturer":VoltEdgeSPA,
  "Hotel":LuxeHavenHotel,
  "Driving School": DriveDrivingSchool,
  "Graphic Designer" : GraphicDesignerTemplate,
  "Event Planning" : EventPlanningTemplate,
  "Dance Martial" : DanceMartial,
  "Corporategiftingtemplate1" : CorporateGiftingTemplate1,
  "AutoLux" : AutoDetailing,
};

export const SLUG_TO_TEMPLATE_COMPONENT: Record<string, React.ComponentType<any>> = {
  "autolux-premium-auto-detailing": AutoDetailing,
  "artisan-bakery-pastry": BakerTemplate,
  "digital-ecard-business-card": EcardProfile,
  "taxnest-ca-consultant": TaxNestLandingPage,
  "lumina-tailors-bespoke": LuminaTailorsSPA,
  "luxury-corporate-gifting": LuxuryLandingPage,
  "zenith-martial-arts-dance": DanceMartial,
  "drivepro-driving-school": DriveDrivingSchool,
  "voltedge-electrical-manufacturing": VoltEdgeSPA,
  "lumina-events-planner": LuminaEventsSPA,
  "royale-touche-flooring": RoyaleTouche,
  "creative-graphic-designer": GraphicDesignerTemplate,
  "carewell-healthcare-clinic": HealthcareClinicTemplate,
  "luxehaven-boutique-hotel": LuxeHavenHotel,
  "securelife-insurance-agency": InsuranceLandingPage,
  "hutch-luxury-interior-design": InteriorHutch,
  "swarna-luxury-jewellery": SwarnaJewelryLandingPage,
  "lexjuris-corporate-law-firm": LawFirmTemplate,
  "master-zen-qigong-trainer": Trainer,
  "primerealty-real-estate": RealEstateTemplate,
  "greenleaf-tree-care": GreenLeafTreeCare,
  "nexus-web-development-agency": WebDev,
  "bella-luxury-beauty-salon": BeautySalon,
  "woodcraft-carpentry-studio": CarpentryStudioTemplate,
  "chocolatier-artisanal-sweets": ChocolateTemplate,
  "ironpulse-fitness-gym": FitnessGymTemplate,
  "bloom-petals-luxury-florist": Florist,
  "crystalcraft-glass-studio": GlassStudioTemplate,
  "mobilezone-accessories": MobileAccessoriesStoreTemplate,
  "colorsplus-painting-studio": PaintingStudioTemplate,
  "prilly-pilates-studio": PrillyPilatesStudio,
  "athletica-sports-outlet": SportsOutletTemplate,
  "wanderlust-travel-agency": TravelAgencyTemplate,
  "edupro-tuition-coaching": TuitionCoachingTemplate,
  "yova-yoga-sanctuary": YovaYogaStudio,
  "folio-creative-developer": FolioTemplate,
  "novastudio-product-brand-agency": NovaStudioTemplate,
  "prestige-event-planning": EventPlanningTemplate,
  "modern-interior-hutch-studio": HutchTemplate,
  "elite-corporate-gifting-hampers": CorporateGiftingTemplate1,
};