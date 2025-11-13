// import React, { useState } from "react";

// /**
//  * Responsive version that:
//  * - Keeps desktop font sizes & paddings intact (unchanged for md and up)
//  * - Adjusts spacing & usability on small screens (sm/md)
//  * - Applies the same 'inner' framed style to every framed block
//  *
//  * Requires Tailwind CSS.
//  */

// export default function ResidentialSpecs(): JSX.Element {
//     const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

//     // reusable framed wrapper class (kept as string to avoid repetition noise)
//     const INNER_FRAME = "inner border-[6px] border-[#f4f4f4] rounded-[3rem] overflow-x-auto bg-white";

//     return (
//         <section className="bg-white w-full">
//             {/* outer container: fluid but caps at original desktop widths */}
//             <div className="mx-auto w-full max-w-[1351px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-12">
//                 {/* inner card: keeps desktop padding and sizes at md+ */}
//                 <div className="mx-auto w-full max-w-[1175px] bg-white rounded-[20px] shadow-sm">
//                     {/* header block with responsive padding (desktop retains the same visual) */}
//                     <div className="p-6 md:p-10 lg:p-12">
//                         <div className="section-heading reveal">
//                             <h2
//                                 className="text-[clamp(30px,3.2vw,56px)] leading-[1.08] font-light tracking-[-0.005em] text-gray-950 mb-4"
//                                 style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif', wordSpacing: "-0.08em" }}
//                             >
//                                 Portable Oven
//                             </h2>

//                             <p className="text-[16px] md:text-[18px] text-[#575757] leading-[1.7] tracking-[0.02em] mb-6">
//                                 Explore the full specs and guarantees of our Residential and steel ovens
//                             </p>

//                             {/* Tabs: stack on very small screens but appear side-by-side from sm/up */}
//                             <ul className="flex flex-col sm:flex-row gap-3 mt-4">
//                                 <li className="w-full sm:w-auto">
//                                     <button
//                                         onClick={() => setActiveTab("tab1")}
//                                         className={`w-full sm:w-auto block text-center px-5 py-2 rounded-xl text-[16px] md:text-[18px] transition ${activeTab === "tab1" ? "bg-[#e30715] text-white" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
//                                             }`}
//                                     >
//                                         Portable Ovens
//                                     </button>
//                                 </li>

//                             </ul>
//                         </div>
//                     </div>

//                     {/* TAB CONTENT - wrapper keeps spacing consistent */}
//                     <div className="px-6 md:px-10 lg:px-12 pb-10 md:pb-12 tab-content-wrapper reveal">
//                         {/* ---------- TAB 1 - PORTABLE OVEN ---------- */}
//                         <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
//                             {/* Specification framed panel */}
//                             <div className="tab-content-inner mt-3">
//                                 <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em] mb-4">
//                                     Specification:
//                                 </h4>

//                                 <div className="spec-table-wrapper">
//                                     {/* IMPORTANT: inner frame uses responsive padding: p-6 on small, p-10 at md+ so desktop unchanged */}
//                                     <div className={`${INNER_FRAME} p-6 md:p-10`} aria-hidden={false}>
//                                         <div className="min-w-[680px]">
//                                             <table className="w-full text-base text-gray-800 border-collapse">
//                                                 <tbody>
//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Description</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Portable Oven</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Large Steel Oven</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Medium Steel Oven</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Shape</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Barell</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Dome</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Dome</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Capacity</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">4 pizza at a time — 48 pizza per hour</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">3 pizza at a time — 36 pizza per hour</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">2 pizza at a time — 24 pizza per hour</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Materials</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Stainless steel dome, thick fire bricks cooking base</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Thick stainless steel dome, thick fire bricks cooking base</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Thick stainless steel dome, thick fire bricks cooking base</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Insulation</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Multi layers, high density ceramic: side, top and bottom</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Multi layers, high density ceramic: side, top and bottom</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Multi layers, high density ceramic: side, top and bottom</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Finishings</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Epoxy coated paint</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Mosaic tiles, broken tiles, bricks and stone</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Mosaic tiles, broken tiles, bricks and stone</td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Dimensions framed panel */}
//                             <div className="tab-content-inner mt-6">
//                                 <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em] mb-4">Dimension &amp; weight:</h4>

//                                 <div className="spec-table-wrapper">
//                                     <div className={`${INNER_FRAME} p-6 md:p-10`}>
//                                         <div className="min-w-[680px]">
//                                             <table className="w-full text-base text-gray-800 border-collapse">
//                                                 <tbody>
//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Description</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Portable Oven</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Large Steel Oven</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">Medium Steel Oven</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Internal</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">100 x 75 cm</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">90 x 90 cm</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">70 x 70 cm</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">External</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">115 x 90 cm</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">105 x 105 cm</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">85 x 85 cm</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Mouth Width</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">55 cm</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">40 cm</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">40 cm</td>
//                                                     </tr>

//                                                     <tr className="border-t border-gray-200">
//                                                         <td className="py-3 px-4 font-semibold text-gray-700">Weight</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">250 kg</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">200 kg</td>
//                                                         <td className="py-3 px-4 text-[16px] text-[#575757]">150 kg</td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                                                     {/* Warranty framed panel */}
//                             <div className="tab-content-inner mt-6">
//                                 <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em] mb-4">Warranty:</h4>
//                                 <div className={`${INNER_FRAME} p-6 md:p-10`}>
//                                     <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6]">
//                                         All Saif Oven has 1-year on-site warranty and a lifetime guarantee against manufacturing defects.
//                                     </p>
//                                     <p className="mt-3 text-[16px] md:text-[17px] text-[#575757] leading-[1.6]">Maintenance &amp; Aftercare</p>
//                                     <p className="mt-3 text-[16px] md:text-[17px] text-[#575757] leading-[1.6]">
//                                         After the warranty period, Saif provides cost-based repair and maintenance support, ensuring customers always have access to genuine service whenever needed.
//                                         Our ovens are designed for exceptional durability, built with precision materials and engineering that minimize the need for frequent servicing.
//                                         Rather than focusing on recurring service income, Saif prioritizes customer satisfaction and lasting performance, building genuine trust and long-term relationships.
//                                         This commitment has led to strong customer loyalty, with most clients choosing Saif again for future requirements and proudly recommending our ovens to others.
//                                         Many professionals who once used other brands have switched to Saif’s ovens, recognizing our superior build quality, performance, and dependable after-sales support.
//                                     </p>
//                                 </div>
//                             </div>

//                         </div>

//                     </div>{/* end tab-content-wrapper */}
//                 </div>{/* end inner card */}
//             </div>{/* end outer container */}
//         </section>
//     );
// }


import React, { useState } from "react";

/**
 * Responsive version that:
 * - Keeps desktop font sizes & paddings intact (unchanged for md and up)
 * - Adjusts spacing & usability on small screens (sm/md)
 * - Applies the same 'inner' framed style to every framed block
 *
 * Requires Tailwind CSS.
 */

export default function ResidentialSpecs(): JSX.Element {
    const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

    // reusable framed wrapper class (kept as string to avoid repetition noise)
    const INNER_FRAME = "inner border-[6px] border-[#f4f4f4] rounded-[3rem] overflow-x-auto bg-white";

    return (
        <section className="bg-white w-full">
            {/* outer container: fluid but caps at original desktop widths */}
            <div className="mx-auto w-full max-w-[1351px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-12">
                {/* inner card: keeps desktop padding and sizes at md+ */}
                <div className="mx-auto w-full max-w-[1175px] bg-white rounded-[20px] shadow-sm">
                    {/* header block with responsive padding (desktop retains the same visual) */}
                    <div className="p-6 md:p-10 lg:p-12">
                        <div className="section-heading reveal">
                            <h2
                                className="text-[clamp(30px,3.2vw,56px)] leading-[1.08] font-light tracking-[-0.005em] text-gray-950 mb-4"
                                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif', wordSpacing: "-0.08em" }}
                            >
                                Portable Oven
                            </h2>

                            <p className="text-[16px] md:text-[18px] text-[#575757] leading-[1.7] tracking-[0.02em] mb-6">
                                Explore the full specs and guarantees of our Residential and steel ovens
                            </p>

                            {/* Tabs: stack on very small screens but appear side-by-side from sm/up */}
                            <ul className="flex flex-col sm:flex-row gap-3 mt-4">
                                <li className="w-full sm:w-auto">
                                    <button
                                        onClick={() => setActiveTab("tab1")}
                                        className={`w-full sm:w-auto block text-center px-5 py-2 rounded-xl text-[16px] md:text-[18px] transition ${activeTab === "tab1" ? "bg-[#e30715] text-white" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                                            }`}
                                    >
                                        Portable Ovens
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* TAB CONTENT - wrapper keeps spacing consistent */}
                    <div className="px-6 md:px-10 lg:px-12 pb-10 md:pb-12 tab-content-wrapper reveal">
                        {/* ---------- TAB 1 - PORTABLE OVEN ---------- */}
                        <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
                            {/* Specification framed panel */}
                            <div className="tab-content-inner mt-3">
                                <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em] mb-4">
                                    Specification:
                                </h4>

                                <div className="spec-table-wrapper">
                                    {/* IMPORTANT: inner frame uses responsive padding: p-6 on small, p-10 at md+ so desktop unchanged */}
                                    <div className={`${INNER_FRAME} p-6 md:p-10`} aria-hidden={false}>
                                        <div className="min-w-[680px]">
                                            <table className="w-full text-base text-gray-800 border-collapse">
                                                <tbody>
                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Description</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Medium Steel Oven</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Small Steel Oven</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Shape</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Dome</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Dome</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Capacity</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">2 pizza at a time. 24 pizza per hour.</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">1 pizza at a time. 12 pizza per hour.</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Materials</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Thick stainless steel dome. Fire bricks cooking base.</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Thick stainless steel dome. Fire bricks cooking base.</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Insulation</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Multi layers, high density ceramic: side, top and bottom.</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Multi layers, high density ceramic: side, top and bottom.</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Finishings</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Mosaic tiles, broken tiles, bricks and stone</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Epoxy coated paint</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dimensions framed panel */}
                            <div className="tab-content-inner mt-6">
                                <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em] mb-4">Dimension &amp; weight:</h4>

                                <div className="spec-table-wrapper">
                                    <div className={`${INNER_FRAME} p-6 md:p-10`}>
                                        <div className="min-w-[680px]">
                                            <table className="w-full text-base text-gray-800 border-collapse">
                                                <tbody>
                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Description</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Medium Steel Oven</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">Small Steel Oven</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Internal</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">70 x 70 cm</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">50 x 50 cm</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">External</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">85 x 85 cm</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">60 x 60 cm</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Mouth width</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">40 cm</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">40 cm</td>
                                                    </tr>

                                                    <tr className="border-t border-gray-200">
                                                        <td className="py-3 px-4 font-semibold text-gray-700">Weight</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">150 kg</td>
                                                        <td className="py-3 px-4 text-[16px] text-[#575757]">50 kg</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                                    {/* Warranty framed panel */}
                            <div className="tab-content-inner mt-6">
                                <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em] mb-4">Warranty:</h4>
                                <div className={`${INNER_FRAME} p-6 md:p-10`}>
                                    <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6]">
                                        All Saif Oven has 1-year on-site warranty and a lifetime guarantee against manufacturing defects.
                                    </p>
                                    <p className="mt-3 text-[16px] md:text-[17px] text-[#575757] leading-[1.6]">Maintenance &amp; Aftercare</p>
                                    <p className="mt-3 text-[16px] md:text-[17px] text-[#575757] leading-[1.6]">
                                        After the warranty period, Saif provides cost-based repair and maintenance support, ensuring customers always have access to genuine service whenever needed.
                                        Our ovens are designed for exceptional durability, built with precision materials and engineering that minimize the need for frequent servicing.
                                        Rather than focusing on recurring service income, Saif prioritizes customer satisfaction and lasting performance, building genuine trust and long-term relationships.
                                        This commitment has led to strong customer loyalty, with most clients choosing Saif again for future requirements and proudly recommending our ovens to others.
                                        Many professionals who once used other brands have switched to Saif’s ovens, recognizing our superior build quality, performance, and dependable after-sales support.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>{/* end tab-content-wrapper */}
                </div>{/* end inner card */}
            </div>{/* end outer container */}
        </section>
    );
}
