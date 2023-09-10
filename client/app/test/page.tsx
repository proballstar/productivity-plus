import React from "react";

export default function MacbookPro(){
    return (
        <div className="bg-[#bacae3] flex flex-row justify-center w-full">
            <div className="bg-[#bacae3] overflow-hidden w-[1512px] h-[982px] relative">
                <div className="top-[-189px] left-[-212px] bg-[#2a3757] absolute w-[500px] h-[500px] rounded-[250px] blur-[500px]" />
                <div className="absolute w-[1314px] h-[1007px] top-[-297px] left-[328px]">
                    <div className="top-0 left-[735px] bg-[#6f81ac] absolute w-[500px] h-[500px] rounded-[250px] blur-[500px]" />
                    <div className="top-[222px] left-[814px] bg-[#6f81ac] absolute w-[500px] h-[500px] rounded-[250px] blur-[500px]" />
                    <div className="inline-flex items-start gap-[33px] absolute top-[343px] left-[826px]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Regular',_Helvetica] font-normal text-black text-[20px] tracking-[0] leading-[normal]">
                            Home
                        </div>
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Regular',_Helvetica] font-normal text-black text-[20px] tracking-[0] leading-[normal]">
                            Leaderboard
                        </div>
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Bold',_Helvetica] font-bold text-black text-[20px] tracking-[0] leading-[normal]">
                            Login
                        </div>
                    </div>
                    <div className="inline-flex flex-col items-center gap-[24px] px-0 py-[24px] absolute top-[570px] left-0">
                        <div className="relative w-[477px] h-[107px]">
                            <div className="absolute top-0 left-0 [font-family:'Inter-Black',_Helvetica] font-black text-black text-[64px] tracking-[0] leading-[normal]">
                                Welcome Back
                            </div>
                            <p className="absolute top-[77px] left-[8px] [font-family:'Poppins-Regular',_Helvetica] font-normal text-black text-[20px] tracking-[0] leading-[normal]">
                                Get ready to get level up your procrastination
                            </p>
                        </div>
                        <div className="relative w-[858px] h-[69px] mr-[-2.00px]">
                            <div className="relative w-[856px] h-[69px] bg-[#f7f7f7] rounded-[50px] shadow-[0px_4px_50px_#00000040]">
                                <img
                                    className="absolute w-[35px] h-[40px] top-[14px] left-[38px]"
                                    alt="User solid"
                                    src="user-solid-1.svg"
                                />
                                <input placeholder="Username" className="absolute top-[22px] left-[101px] [font-family:'Inter-Medium',_Helvetica] font-medium text-[#00000087] text-[20px] tracking-[0] leading-[normal] whitespace-nowrap" />
                            </div>
                        </div>
                        <div className="relative w-[856px] h-[79px] bg-[#f7f7f7] rounded-[50px] shadow-[0px_4px_50px_#00000040]">
                            <div className="inline-flex items-center gap-[23px] relative top-[19px] left-[38px]">
                                <img className="relative w-[40px] h-[40px]" alt="Key solid" src="key-solid-1.svg" />
                                <div className="relative w-fit [font-family:'Inter-Medium',_Helvetica] font-medium text-[#00000087] text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Password
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-[697px] left-[-250px] bg-[#6f81ac] absolute w-[500px] h-[500px] rounded-[250px] blur-[500px]" />
                <div className="absolute w-[223px] h-[42px] top-[722px] left-[963px]">
                    <img className="absolute w-[40px] h-[37px] top-0 left-[181px] object-cover" alt="Image" src="image-3.png" />
                    <div className="absolute w-[179px] top-[6px] left-0 [font-family:'Poppins-Bold',_Helvetica] font-bold text-black text-[20px] tracking-[0] leading-[normal]">
                        Enter to Continue
                    </div>
                </div>
            </div>
        </div>
    );
};
