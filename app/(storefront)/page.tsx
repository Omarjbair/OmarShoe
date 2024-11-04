import Category from "../components/storefront/Category";
import FeaturedProducts from "../components/storefront/FeaturedProducts";
import Hero from "../components/storefront/Hero";

const IndexPage = () => {
    return (
        <main>
            <Hero/>
            <Category/>
            <FeaturedProducts/>
        </main>
    )
}

export default IndexPage;
