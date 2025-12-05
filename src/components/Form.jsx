import React, { useState } from "react";
import { timezones } from "../data/timezones";

export default function Form() {
    const experiencesList = [
        { label: "Sun & Beach", icon: "🏖️" },
        { label: "Culture & Museums", icon: "🏛️" },
        { label: "Foodie Spots", icon: "🍜" },
        { label: "Nature & Hiking", icon: "🌿" },
        { label: "Nightlife", icon: "🎶" },
        { label: "Budget Hacks", icon: "💸" },
    ];

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
    });

    const [destinations, setDestinations] = useState([
        {
            destination: "",
            timezone: "",
            startDate: "",
            endDate: "",
            wishlist: "",
            experiences: [],
        },
    ]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleExperience = (index, label) => {
        const updated = [...destinations];
        const expList = updated[index].experiences;

        if (expList.includes(label)) {
            updated[index].experiences = expList.filter((i) => i !== label);
        } else {
            updated[index].experiences = [...expList, label];
        }

        setDestinations(updated);
    };

    const addDestination = () => {
        setDestinations([
            ...destinations,
            {
                destination: "",
                timezone: "",
                startDate: "",
                endDate: "",
                wishlist: "",
                experiences: [],
            },
        ]);
    };

    const removeDestination = (index) => {
        if (index === 0) return;
        setDestinations(destinations.filter((_, i) => i !== index));
    };

    const updateDestination = (index, field, value) => {
        const updated = [...destinations];
        updated[index][field] = value;
        setDestinations(updated);
    };

    const validate = () => {
        let newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "Enter a valid email";

        destinations.forEach((d, i) => {
            if (!d.destination.trim())
                newErrors[`destination_${i}`] = "Destination is required";

            if (!d.timezone.trim())
                newErrors[`timezone_${i}`] = "Timezone is required";

            if (!d.startDate)
                newErrors[`startDate_${i}`] = "Start date is required";

            if (!d.endDate)
                newErrors[`endDate_${i}`] = "End date is required";

            if (d.experiences.length === 0)
                newErrors[`experiences_${i}`] = "Select at least one experience";

            if (d.startDate && d.endDate) {
                if (new Date(d.startDate) > new Date(d.endDate)) {
                    newErrors[`endDate_${i}`] =
                        "End date must be after start date";
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            personalInfo: form,
            destinations,
        };

        console.log("PAYLOAD:", payload);
    };

    const inputBase =
        "px-4 py-2 bg-orange-50 border border-orange-200 rounded-2xl w-full outline-none focus:ring-2 focus:ring-orange-200";

    return (
        <div className="flex flex-col justify-center items-center">
            <img src="/topicon.png" className="w-32 bounce-up" />

            <div className="min-h-screen w-full flex justify-center py-8 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white w-full max-w-3xl rounded-[32px] shadow-xl p-6"
                >


                    <section className="mb-8">
                        <h3 style={{ fontFamily: "Fredoka One" }} className=" flex items-center text-[#e05f00]   text-2xl mb-4">
                            <span className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart h-6 w-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                            </span> About you
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-[#e05f00]  text-sm font-semibold text-center block">
                                    First Name *
                                </label>
                                <input
                                    name="firstName"
                                    onChange={handleChange}
                                    className={inputBase}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-[#e05f00]  text-sm font-semibold text-center block">
                                    Middle Name
                                </label>
                                <input name="middleName" onChange={handleChange} className={inputBase} />
                            </div>

                            <div>
                                <label className="text-[#e05f00]  text-sm font-semibold text-center block">
                                    Last Name *
                                </label>
                                <input
                                    name="lastName"
                                    onChange={handleChange}
                                    className={inputBase}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-[#e05f00]  text-sm font-semibold text-center block">
                                    Best Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    className={inputBase}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 style={{ fontFamily: "Fredoka One" }} className="flex items-center text-[#e05f00]  text-2xl mb-4">
                            <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane h-6 w-6"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg></span>
                            Where are you planning to travel this year?
                        </h3>

                        {destinations.map((dest, index) => (
                            <div key={index} className="relative mb-8 p-5 border bg-orange-50 border-orange-100 rounded-2xl ">
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDestination(index)}
                                        className="absolute -top-3 -right-3 bg-white border border-orange-200 rounded-full p-1.5 shadow-md hover:bg-red-50"
                                    >
                                        <span className="text-[#e05f00] font-bold">✕</span>
                                    </button>
                                )}

                                <div style={{ fontFamily: "Fredoka One" }} className="text-[#e05f00]  mb-3 text-xl text-center block">
                                    Destination {index + 1}
                                </div>

                                <div className="mb-4">
                                    <label className="text-[#e05f00]  text-sm font-semibold text-center block">Where to? *</label>
                                    <input
                                        value={dest.destination}
                                        onChange={(e) => updateDestination(index, "destination", e.target.value)}
                                        placeholder="e.g. Tokyo, Japan or Bali, Indonesia"
                                        className={inputBase}
                                    />
                                    {errors[`destination_${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[`destination_${index}`]}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-4">
                                    <div>
                                        <label className="text-[#e05f00]  text-sm font-semibold text-center block">
                                            Select Timezone *
                                        </label>

                                        <select
                                            value={dest.timezone}
                                            onChange={(e) =>
                                                updateDestination(index, "timezone", e.target.value)
                                            }
                                            className={inputBase}
                                        >
                                            {timezones.map((tz) => (
                                                <option key={tz.value} value={tz.value}>
                                                    {tz.label}
                                                </option>
                                            ))}
                                        </select>

                                        {errors[`timezone_${index}`] && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors[`timezone_${index}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-[#e05f00] text-sm font-semibold flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                            Start date *</label>
                                        <input
                                            type="date"
                                            value={dest.startDate}
                                            onChange={(e) => updateDestination(index, "startDate", e.target.value)}
                                            className={inputBase}
                                        />
                                        {errors[`startDate_${index}`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`startDate_${index}`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-[#e05f00]  text-sm font-semibold flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                            End date *</label>
                                        <input
                                            type="date"
                                            value={dest.endDate}
                                            onChange={(e) => updateDestination(index, "endDate", e.target.value)}
                                            className={inputBase}
                                        />
                                        {errors[`endDate_${index}`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`endDate_${index}`]}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-[#e05f00]  font-semibold mb-2 text-center block">
                                        What kind of experience are you looking for?
                                        <span className="text-[#e05f00] "> (Choose all that apply)</span>
                                    </label>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {experiencesList.map((exp) => {
                                            const active = dest.experiences.includes(exp.label);
                                            return (
                                                <button
                                                    key={exp.label}
                                                    type="button"
                                                    onClick={() => toggleExperience(index, exp.label)}
                                                    className={`flex items-center justify-start gap-2 px-4 py-2 rounded-2xl border-2 text-sm ${active
                                                        ? "bg-orange-500 text-white border-orange-500"
                                                        : "bg-white text-[#1A1A2E] border-orange-300 hover:bg-orange-100"
                                                        }`}
                                                >
                                                    {exp.label} {exp.icon}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {errors[`experiences_${index}`] && (
                                        <p className="text-red-500 text-xs mt-2 text-center">
                                            {errors[`experiences_${index}`]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-[#e05f00] text-sm font-semibold text-center block">
                                        Your wishlist & must-do
                                    </label>
                                    <textarea
                                        value={dest.wishlist}
                                        onChange={(e) =>
                                            updateDestination(index, "wishlist", e.target.value)
                                        }
                                        placeholder="e.g., Try authentic ramen, visit temples, experience nightlife, find best Instagram spots..."
                                        rows={3}
                                        className={`${inputBase} rounded-2xl resize-none`}
                                    ></textarea>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addDestination}
                            className="w-full bg-yellow-300 hover:bg-yellow-400 text-[#e05f00]  font-semibold py-3 rounded-full flex items-center justify-center gap-2 mb-8"
                        >
                            <span className="text-lg">+</span> Add another destination ✈️
                        </button>
                    </section>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full"
                    >
                        ✨ Get My Custom Itinerary
                    </button>

                    <p className="text-center text-sm text-[#e05f00]  mt-3">
                        Sunny & team value privacy. We'll use your details solely to craft your itinerary and email it back – pinky promise. 💌
                    </p>
                </form>
            </div>
        </div>
    );
}
