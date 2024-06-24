import { TopLabelTrucks } from "./TopLabelTrucks";
import { Truck } from "./Truck";

export function TrucksOfPlaylist({}: {}) {
    return (
        <div className="px-6 pb-8 fill-stone-400 text-stone-400 font-medium">
            <TopLabelTrucks />
            <div>
                {[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null].map((v, i) => {
                    return <Truck key={i} index={i} />;
                })}
            </div>
        </div>
    );
}
