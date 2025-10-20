import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-[#F8F6EB] min-h-screen text-[#1D3B2A]">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="px-10 py-10"></section>
      <section className="relative h-[90vh] flex flex-col justify-end px-10 pb-20 overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Restaurant"
          fill
          className="object-cover brightness-32 z-0"
        />
        <div className="max-w-2xl relative z-10 pl-5">
          <h1 className="text-8xl font-playfair font-bold text-white leading-tight">
            Fresh,
            <br />
            fast &<br />




















            
            flavorful !
          </h1>
          <p className="text-white mt-4 text-lg">
            Bento Resto presents an authentic taste of Indonesian cuisine with a
            modern touch, offering a variety of delicious dishes made from the
            finest quality ingredients. With a cozy atmosphere and friendly
            service, Bento is the perfect choice for daily dining, family
            gatherings, or special occasions.
          </p>
          <Button className="mt-6 bg-[#E0A800] text-black font-semibold rounded-xl px-6 py-3 hover:bg-[#cf9600]">
            <a href="/auth/login">Reserve Now !</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about"></section>
      <section className="bg-[#fff7e6] py-16 px-6 md:px-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Gambar kiri  */}
          <div className="relative w-full md:w-1/2">
            <Image
              src="/images/about_us1.jpeg"
              alt="Bento Restaurant Interior"
              width={600}
              height={400}
              className="rounded-md object-cover w-full h-[600px]"
            />
            <div className="absolute top-6 left-6 bg-[#FFB200] bg-opacity-90 text-[#2b2b2b] p-6 rounded-md shadow-lg max-w-md">
              <h2 className="text-3xl font-semibold mb-4">About Us</h2>
              <p className="text-justify mb-3">
                At Bento Resto, we bring the authentic flavors of Indonesian
                cuisine to life with a contemporary twist.
              </p>
              <p className="text-justify">
                Our dishes are crafted from the finest ingredients, combining
                traditional recipes with modern presentation to create an
                unforgettable dining experience. We believe that great food
                brings people together — and at Bento, every meal tells a story
                of flavor, passion, and culture.
              </p>
            </div>
          </div>

          {/* Gambar kanan */}
          <div className="w-full md:w-1/2">
            <Image
              src="/images/sate.jpeg"
              alt="Sate Dish"
              width={500}
              height={400}
              className="rounded-md object-cover w-full h-[600px]"
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="bg-[#F8F6EB] py-20 px-6 md:px-20 text-center"
      >
        <h2 className="text-4xl font-bold mb-8 text-[#1D3B2A]">Our Menu</h2>
        <p className="text-2xl  text-[#4a4a4a] mb-10">
          Explore our digital menu book below. Flip through to discover our
          delicious dishes and drinks!
        </p>

        {/* Embed FlipHTML5 */}
        <div className="flex justify-center">
          <iframe
            src="https://online.fliphtml5.com/liana/bcfm/"
            width="80%"
            height="600"
            seamless
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="px-19 py-19">
        <h2 className="text-3xl font-bold mb-8">Venue</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <Image
            src="/images/floor1.png"
            alt="Floor 1"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
          <div className="bg-[#E0A800] p-8 rounded-lg text-[#1D3B2A] font-medium text-2xl">
            <h3 className="text-3xl font-semibold mb-3">Floor 1</h3>
            <p>
              Welcome to a space that is open, airy, and buzzing with positive
              energy. Our modern-industrial design embraces natural light, clean
              lines, and a refreshing connection to nature — perfect for
              gathering, connecting, and enjoying great food in a lively
              setting.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
