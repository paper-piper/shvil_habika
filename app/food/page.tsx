import { restaurants } from "@/lib/data"
import { RestaurantCard } from "@/components/restaurant-card"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "איפה לאכול | שביל הבקעה",
  description: "מסעדות, בתי קפה ופינות אוכל מומלצות לאורך שביל הבקעה ובקעת הירדן.",
}

export default function FoodPage() {
  return (
    <div>
      <PageHeader
        title="איפה נאכל?"
        description="מסעדות, בתי קפה ופינות אוכל מומלצות לאורך השביל ובסביבתו"
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
