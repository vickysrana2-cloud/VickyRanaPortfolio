"use client";

import { useParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export const ChocolateTemplate: React.FC<{ data: any }> = ({ data }) => {
  console.log("data iss", data);

  const params = useParams();
  const productId = params.tenantId;

  const basic = data?.basicInfo || {};
  const contact = data?.contact || {};
  const footer = data?.footer || {};
  const hero = data?.heroSection || {};
  const timings = data?.timings || {};
  const products = data?.products?.products || [];

  const shopName = basic.name || "Sweet Shop";
  const tagline = basic.tagline || "";
  const aboutUs = basic.aboutUs || "";
  const address = contact.address || "";
  const phone = contact.phone || "";
  const email = contact.email || "";
  const instagram = contact.instagram || "";
  const socialLinks = data?.socialLinks || {};
  const whatsappNumber = contact.whatsapp || socialLinks.whatsappNumber || contact.phone || "1234567890";
  const floatingWhatsappNumber = String(whatsappNumber).replace(/\D/g, "");
  const copyright = footer.copyright || "";
  const companyName = footer.companyName || shopName;

  const highlights = [
    "Freshly baked daily",
    "Imported ingredients",
    "Authentic taste",
    "No preservatives",
    "Made with love",
    "Handcrafted daily",
  ];

  const reviews = [
    {
      text: "Absolutely the best chocolates I've ever had.",
      author: "Priya S.",
      stars: 5,
    },
    {
      text: "Ordered the gift box for my wife's birthday. She loved it!",
      author: "Rahul M.",
      stars: 5,
    },
    {
      text: "Their hot chocolate is incredible.",
      author: "Neha K.",
      stars: 5,
    },
  ];

  const days = [
    {
      day: "Monday",
      open: timings.mondayOpen || "16:00",
      close: timings.mondayClose || "21:00",
    },
    {
      day: "Tuesday",
      open: timings.tuesdayOpen || "16:00",
      close: timings.tuesdayClose || "21:00",
    },
    {
      day: "Wednesday",
      open: timings.wednesdayOpen || "16:00",
      close: timings.wednesdayClose || "21:00",
    },
    {
      day: "Thursday",
      open: timings.thursdayOpen || "16:00",
      close: timings.thursdayClose || "21:00",
    },
    {
      day: "Friday",
      open: timings.fridayOpen || "16:00",
      close: timings.fridayClose || "22:00",
    },
    {
      day: "Saturday",
      open: timings.saturdayOpen || "14:00",
      close: timings.saturdayClose || "22:00",
    },
    {
      day: "Sunday",
      open: timings.sundayOpen || "14:00",
      close: timings.sundayClose || "20:00",
    },
  ];

  const getProductValue = (product: any, key: string) => {
    return (
      product?.data?.find((item: any) => item.key === key)?.value || ""
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        html {
          scroll-behavior: smooth;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: flex;
          width: max-content;
        }

        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[88vh] bg-[#FAF7F2]">
        <div className="px-4 md:px-12 py-12 md:py-24 flex flex-col justify-center">
          <div className="flex flex-row gap-5 items-center mb-4">
            <p className="h-[2px] w-[20px] bg-[#b64826]" />

            <p className="uppercase text-[#b74d2d] text-sm tracking-widest">
              {tagline}
            </p>
          </div>

          <h1 className="font-['Playfair_Display',serif] text-4xl md:text-6xl text-[#3D1F0A] mb-6 leading-tight">
            {aboutUs || "A taste of tradition on your doorstep"}
          </h1>

          <p className="text-[#7A5C48] text-lg leading-relaxed max-w-md mb-10 font-light">
            Freshly made every morning with love, tradition, and the finest
            ingredients.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#menu"
              className="bg-[#C8502A] text-white px-7 py-3 rounded-lg font-medium hover:bg-[#8B3418] transition"
            >
              View Menu
            </a>

            <a
              href="#contact"
              className="border-2 border-[#C8502A] text-[#8B3418] px-7 py-3 rounded-lg font-medium hover:bg-[#FDF4EF] transition"
            >
              Contact us
            </a>

            {productId && (
              <a
                href={`/product/${productId}`}
                className="border-2 border-[#C8502A] text-[#8B3418] px-7 py-3 rounded-lg font-medium hover:bg-[#FDF4EF] transition"
              >
                Product Page
              </a>
            )}
          </div>
        </div>

        <div className="bg-[#F5E6DC] flex items-center justify-center p-12">
          {hero.heroImage ? (
            <img
              src={hero.heroImage}
              alt={shopName}
              className="rounded-2xl w-full aspect-[4/5] object-cover"
            />
          ) : (
            <div className="bg-[#FDF4EF] rounded-2xl border border-[rgba(140,80,40,0.15)] w-full aspect-[4/5] flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl block mb-4">🍫</span>

                <div className="font-['Playfair_Display',serif] text-[#8B3418] italic">
                  Handcrafted
                  <br />
                  with love
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MARQUEE */}
      <div className="w-full bg-[#b64826] py-4 overflow-hidden marquee-container">
        <div className="animate-marquee whitespace-nowrap">
          {[...highlights, ...highlights].map((item, i) => (
            <span
              key={i}
              className="font-['Playfair_Display',serif] text-[#F5E6DC] text-sm mx-10 inline-block"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* MENU */}
      <section
        id="menu"
        className="px-4 md:px-12 py-16 md:py-24 bg-[#FAF7F2]"
      >
        <div className="flex flex-row gap-5 items-center mb-2">
          <p className="h-[2px] w-[20px] bg-[#b64826]" />

          <p className="uppercase text-[#b74d2d] text-sm tracking-widest">
            OUR MENU
          </p>
        </div>

        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3D1F0A] font-bold mb-3">
          Made fresh, every single day
        </h2>

        <p className="text-[#7A5C48] text-sm max-w-md mb-10 font-light">
          Everything prepared by hand on the premises each morning. No
          shortcuts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-[#7A5C48] col-span-full">
              No products available yet.
            </p>
          ) : (
            products.map((product: any, idx: number) => {
              const heading = getProductValue(product, "heading");
              const price = getProductValue(product, "price");
              const subHeading = getProductValue(product,"sub-heading");
              const tag = getProductValue(product, "tag");

              return (
                <div
                  key={idx}
                  className="relative h-60 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition group bg-[#F5E6DC]"
                >
                  {product.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${product.image})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                      🍫
                    </div>
                  )}

                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 ${
                      product.image
                        ? "text-white"
                        : "text-[#3D1F0A]"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3 mb-1">
                      <div className="font-['Playfair_Display',serif] text-lg font-semibold">
                        {heading}
                      </div>

                      {price && (
                        <div className="font-medium whitespace-nowrap text-[#C8502A]">
                          {price}
                        </div>
                      )}
                    </div>

                    {subHeading && (
                      <div className="text-sm leading-relaxed font-light mb-2 opacity-80">
                        {subHeading}
                      </div>
                    )}

                    {tag && (
                      <span className="inline-block text-xs bg-[#C8502A]/90 text-white px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* OUR STORY + HOURS */}
      <section
        id="story"
        className="px-4 md:px-12 py-16 md:py-24 bg-[#FDF4EF]"
      >
        <div className="flex flex-row gap-5 items-center mb-2">
          <p className="h-[2px] w-[20px] bg-[#b64826]" />

          <p className="uppercase text-[#b74d2d] text-sm tracking-widest">
            OUR STORY
          </p>
        </div>

        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3D1F0A] mb-3">
          Made with roots, served with heart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
          <div>
            <p className="text-[#7A5C48] text-[15px] leading-relaxed font-light">
              {aboutUs}
            </p>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-[rgba(140,80,40,0.15)] overflow-hidden">
              <div className="bg-[#C8502A] px-6 py-5 text-white font-['Playfair_Display',serif] text-lg">
                Opening hours
              </div>

              <div className="px-6">
                {days.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-3 border-b border-[rgba(140,80,40,0.15)] text-[14px]"
                  >
                    <span className="text-[#7A5C48] font-light">
                      {item.day}
                    </span>

                    <span className="text-[#3D1F0A] font-medium">
                      {item.open} – {item.close}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {address && (
              <div className="mt-4">
                <p className="text-[#7A5C48] text-[15px] font-light">
                  {address}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-4 md:px-12 py-16 md:py-24 bg-[#FAF7F2]">
        <div className="flex flex-row gap-5 items-center mb-2">
          <p className="h-[2px] w-[20px] bg-[#b64826]" />

          <p className="uppercase text-[#b74d2d] text-sm tracking-widest">
            WHAT PEOPLE SAY
          </p>
        </div>

        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3D1F0A] mb-3">
          Loved by our neighbours
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white border border-[rgba(140,80,40,0.15)] rounded-xl p-6"
            >
              <div className="text-4xl text-[#F5E6DC] font-['Playfair_Display',serif] leading-none mb-2">
                "
              </div>

              <div className="text-[14px] text-[#7A5C48] italic leading-relaxed font-light mb-4">
                {review.text}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#3D1F0A]">
                  {review.author}
                </span>

                <span className="text-[#C9973A] text-[13px]">
                  {"★".repeat(review.stars)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="px-4 md:px-12 py-16 md:py-24 bg-[#FDF4EF]"
      >
        <div className="flex flex-row gap-5 items-center mb-2">
          <p className="h-[2px] w-[20px] bg-[#b64826]" />

          <p className="uppercase text-[#b74d2d] text-sm tracking-widest">
            GET IN TOUCH
          </p>
        </div>

        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3D1F0A] mb-3">
          Visit Us Or Place an Order
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 mt-8">
          <div className="space-y-7">
            {[
              {
                icon: "📍",
                label: "Address",
                value: address,
                href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`,
              },
              {
                icon: "📞",
                label: "Phone",
                value: phone,
                href: `tel:${phone}`,
              },
              {
                icon: "📧",
                label: "Email",
                value: email,
                href: `mailto:${email}`,
              },
              {
                icon: "📸",
                label: "Instagram",
                value: instagram
                  ? `@${instagram.split("/").filter(Boolean).pop()}`
                  : "",
                href: instagram,
              },
            ]
              .filter((item) => item.value)
              .map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C8502A] rounded-lg flex items-center justify-center text-white">
                    {item.icon}
                  </div>

                  <div>
                    <strong className="text-[14px] text-[#3D1F0A] block mb-1">
                      {item.label}
                    </strong>

                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#7A5C48] font-light hover:text-[#C8502A]"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-2xl p-9 border border-[rgba(140,80,40,0.15)]">
            <div className="font-['Playfair_Display',serif] text-2xl text-[#3D1F0A] mb-6">
              Send us a message
            </div>

            <div className="space-y-4">
              {["Your name", "Email address"].map((label) => (
                <div key={label}>
                  <label className="block text-[11px] font-medium text-[#7A5C48] uppercase tracking-wide mb-2">
                    {label}
                  </label>

                  <input
                    type={label.includes("Email") ? "email" : "text"}
                    className="w-full p-3 border-2 border-[rgba(140,80,40,0.15)] rounded-lg bg-[#FAF7F2] focus:border-[#C8502A] focus:bg-white outline-none transition text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[11px] font-medium text-[#7A5C48] uppercase tracking-wide mb-2">
                  Your message
                </label>

                <textarea
                  rows={3}
                  className="w-full p-3 border-2 border-[rgba(140,80,40,0.15)] rounded-lg bg-[#FAF7F2] focus:border-[#C8502A] focus:bg-white outline-none transition text-sm"
                />
              </div>

              <button className="w-full bg-[#C8502A] text-white py-4 rounded-lg font-medium hover:bg-[#8B3418] transition">
                Send message →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3D1F0A] px-4 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-['Playfair_Display',serif] text-2xl text-[#F5E6DC] mb-2">
            {companyName}
          </div>

          <div className="text-[12px] text-white/40 uppercase font-light">
            {tagline}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-medium tracking-wider uppercase text-[#C8502A] mb-4">
            Visit us
          </div>

          <ul className="space-y-2">
            {address && (
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-white/50 hover:text-white font-light"
                >
                  {address}
                </a>
              </li>
            )}

            {phone && (
              <li>
                <a
                  href={`tel:${phone}`}
                  className="text-[14px] text-white/50 hover:text-white font-light"
                >
                  {phone}
                </a>
              </li>
            )}

            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-[14px] text-white/50 hover:text-white font-light"
                >
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {instagram && (
          <div>
            <div className="text-[11px] font-medium tracking-wider uppercase text-[#C8502A] mb-4">
              Follow us
            </div>

            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-white/50 hover:text-white font-light"
            >
              Instagram: @{instagram.split("/").filter(Boolean).pop()}
            </a>
          </div>
        )}
      </footer>

      {copyright && (
        <div className="bg-[#3D1F0A] px-12 py-3 border-t border-white/10 text-center text-[12px] text-white/30 font-light">
          {copyright}
        </div>
      )}

      {/* Floating WhatsApp Button */}
      {floatingWhatsappNumber && (
        <a
          href={`https://wa.me/${floatingWhatsappNumber}?text=${encodeURIComponent(
            `Hello ${companyName}, I'd like to place an order or inquire about your chocolates.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      )}
    </div>
  );
};
