import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 gap-10 flex min-h-screen flex-col-reverse lg:flex-row items-center">
            {/* Left Side - About Content */}
            <div className="lg:w-1/2">
                <p className="text-lg text-gray-700 leading-relaxed">
                    At <strong>Fashion</strong>, we believe fashion is more than just clothing - it's a form of self-expression, an art that reflects individuality and confidence. 
                    Our mission is to curate the finest styles that blend contemporary trends with timeless elegance, ensuring that everyone finds something that resonates with their personality.
                </p>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Established by passionate designers and fashion enthusiasts, FashionX aims to bring high-quality apparel and accessories that cater to every style preference. Whether you love 
                    chic minimalism, bold statement pieces, or classic silhouettes, we have something for you.
                </p>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Our collection features hand-picked, ethically sourced materials, ensuring sustainability without compromising on quality. We work closely with skilled artisans and 
                    manufacturers to create clothing that not only looks good but also feels incredible to wear.
                </p>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Join us on this journey of redefining fashion. Your style, your statement.
                </p>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-1/2 lg:mt-0 flex justify-center">
                <Image 
                    src="/images/about.png" 
                    alt="Fashion Brand"
                    width={500} 
                    height={600} 
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}
