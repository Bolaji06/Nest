import { socialLinks } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import footerImage from "../../public/footer-art.svg";
import NestLogo from "../../public/nest-logo.png";

export default function FooterHero() {
  return (
    <>
      <footer className="mt-10 pt-10 bg-gray-100 px-4 md:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mx-auto py-8">
          <div>
            <h2 className="font-medium py-2">Visit our Social</h2>
            <ul>
              {socialLinks.map((social) => {
                return (
                  <li
                    key={social.name}
                    className="text-sm space-y-2 flex items-center  gap-2"
                  >
                    <social.icon size={18} />
                    <Link href={social.link} className="">
                      {social.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <header className="font-medium">Contact</header>
            <ul className="py-2">
              <li className="text-xs">
                <Link
                  href={"mailto:bolajibolajoko0306@gmail.com"}
                  className="text-xs lg:text-base text-brand-primary"
                >
                  bolajibolajoko0306@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Image src={NestLogo} alt="nest logo" className="w-32" />
          </div>
        </div>

        <div>
          <div className="text-xs pb-10 leading-normal space-y-6">
            <p className="">
              Nest is your go-to real estate platform designed to simplify your
              home buying, selling, and renting experience. Our intuitive
              interface and comprehensive property listings make it easy to find
              your dream home or investment property. Whether you&apos;re a
              first-time buyer or a seasoned investor, Nest offers personalized
              tools and insights to help you make informed decisions. Explore a
              world of possibilities with Nest, where your perfect home is just
              a click away.
            </p>
            <p>
              Nest and the Nest logo are trademarks of Nest Real Estate
              Solutions, Inc. All other names, logos, product and service names,
              designs, and slogans used on this website are the trademarks of
              their respective owners. Unauthorized use of any trademark,
              service mark, or logo may be a violation of federal and state
              trademark laws. For any trademark-related inquiries, please
              contact us at trademarks@nestrealestate.com.
            </p>

            <p>
              About Nest Real Estate Solutions, Inc. At Nest Real Estate
              Solutions, Inc., we&apos;re revolutionizing the way people find
              their homes. Founded with the vision to make real estate
              transactions seamless and transparent, we leverage cutting-edge
              technology to connect buyers, sellers, and renters with their
              ideal properties. Our platform, Nest, offers an intuitive and
              user-friendly interface, ensuring that users can effortlessly
              navigate through extensive property listings, detailed
              neighborhood insights, and personalized recommendations. Our
              commitment to excellence is reflected in our team of experienced
              real estate professionals, tech innovators, and customer service
              experts who work tirelessly to provide unparalleled support and
              guidance. We believe that finding a home is more than just a
              transaction—it&apos;s a journey. That&apos;s why we are dedicated
              to creating a trusted, efficient, and enjoyable experience for
              every user. At Nest, we prioritize innovation, trust, and customer
              satisfaction. Whether you&apos;re a first-time homebuyer, a
              seasoned investor, or looking for a rental, Nest is here to help
              you every step of the way. Join us and discover a new era in real
              estate. For more information, visit
              <Link href={"/"} className="text-brand-primary underline">
                {" "}
                www.nestrealestate.com
              </Link>{" "}
              or contact us at{" "}
              <Link
                href={"mailto:bolajibolajoko0306@gmail.com"}
                className="text-brand-primary"
              >
                bolajibolajoko0306@gmail.clom
              </Link>
            </p>
          </div>
        </div>

        <Image src={footerImage} alt="footer image" />
      </footer>
    </>
  );
}
