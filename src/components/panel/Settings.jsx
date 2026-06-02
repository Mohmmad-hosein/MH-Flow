import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const ToggleSwitch = ({ active }) => (
    <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-brandPurple' : 'bg-white/10'}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${active ? '-translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-8 relative w-full">
      <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-brandPink/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold mb-2 text-slate-50">تنظیمات</h1>
          <p className="text-slate-50/50 text-sm">حساب کاربری، ترجیحات و اشتراک خود را مدیریت کنید.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {[
              { id: 'profile', icon: '👤', label: 'اطلاعات پروفایل' },
              { id: 'billing', icon: '💳', label: 'اشتراک و مالی' },
              { id: 'preferences', icon: '⚙️', label: 'ترجیحات برنامه' },
              { id: 'notifications', icon: '🔔', label: 'اعلان‌ها' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-right ${
                  activeTab === tab.id 
                    ? 'bg-brandPurple/20 border border-brandPurple/30 text-white font-bold' 
                    : 'bg-transparent border border-transparent text-slate-50/60 hover:bg-white/5 hover:text-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1">
            
            {activeTab === 'profile' && (
              <div className="animate-[fadeSlide_0.3s_ease-out] space-y-6">
                <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h3 className="font-bold text-lg mb-6">عکس پروفایل</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brandBlue to-brandPurple p-[2px]">
                      <div className="w-full h-full bg-darkBg rounded-full border-2 border-white/20 flex items-center justify-center text-2xl">🧑‍💻</div>
                    </div>
                    <div className="space-y-2">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm transition-colors text-white">تغییر عکس</button>
                      <p className="text-xs text-slate-50/40">فرمت‌های مجاز: JPG, PNG. حداکثر ۲ مگابایت.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h3 className="font-bold text-lg mb-6">اطلاعات شخصی</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-xs text-slate-50/50 mb-2">نام و نام خانوادگی</label>
                      <input type="text" defaultValue="علی حسینی" className="w-full bg-darkBg/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brandPurple transition-colors text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-50/50 mb-2">نام کاربری</label>
                      <input type="text" defaultValue="@alihosseini" className="w-full bg-darkBg/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brandPurple transition-colors text-slate-50/70" disabled />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-slate-50/50 mb-2">ایمیل</label>
                      <input type="email" defaultValue="ali@example.com" className="w-full bg-darkBg/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brandPurple transition-colors text-white" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button className="px-6 py-2.5 bg-gradient-to-br from-brandPurple to-brandViolet text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
                      ذخیره تغییرات
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* تب اشتراک و مالی */}
            {activeTab === 'billing' && (
              <div className="animate-[fadeSlide_0.3s_ease-out] space-y-6">
                <div className="bg-gradient-to-br from-[#1a1642] to-[#0f0c32] border border-brandPurple/30 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-brandPurple/30 blur-3xl rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                        طرح فعلی شما: <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-brandPurple font-bold">رایگان (Free)</span>
                      </h3>
                      <p className="text-sm text-slate-50/50">شما در حال استفاده از پلن پایه هستید.</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">۰ تومان<span className="text-sm font-normal text-slate-50/50">/ماه</span></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 relative z-10">
                    <div className="text-xs text-slate-50/60 mb-2">میزان مصرف شما این ماه:</div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>وظایف (۲۵ از ۵۰)</span>
                        <span>۵۰٪</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-brandBlue"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>درخواست‌های AI (۰ از ۰)</span>
                        <span className="text-brandPink">نیاز به ارتقا</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-brandPink"></div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-br from-brandPurple to-brandViolet text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all relative z-10 flex items-center justify-center gap-2">
                    <span>👑</span> ارتقا به نسخه Pro (حرفه‌ای)
                  </button>
                </div>

                <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h3 className="font-bold text-lg mb-4">تاریخچه پرداخت‌ها</h3>
                  <div className="text-center py-8 text-sm text-slate-50/40">
                    شما هنوز هیچ پرداختی نداشته‌اید.
                  </div>
                </div>
              </div>
            )}

            {/* تب تنظیمات برنامه و اعلان‌ها (مخلوطی برای نمایش) */}
            {(activeTab === 'preferences' || activeTab === 'notifications') && (
              <div className="animate-[fadeSlide_0.3s_ease-out] space-y-6">
                <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h3 className="font-bold text-lg mb-6">تنظیمات ظاهری</h3>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <div className="font-bold text-sm">تم تاریک (Dark Mode)</div>
                      <div className="text-xs text-slate-50/50">استفاده از پس‌زمینه تیره برای محافظت از چشم.</div>
                    </div>
                    <ToggleSwitch active={true} />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-bold text-sm">انیمیشن‌های رابط کاربری</div>
                      <div className="text-xs text-slate-50/50">خاموش کردن برای سیستم‌های ضعیف‌تر.</div>
                    </div>
                    <ToggleSwitch active={true} />
                  </div>
                </div>

                <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h3 className="font-bold text-lg mb-6">ارسال اعلان‌ها</h3>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <div className="font-bold text-sm">یادآور روزانه وظایف</div>
                      <div className="text-xs text-slate-50/50">ارسال ایمیل خلاصه وظایف هر روز صبح.</div>
                    </div>
                    <ToggleSwitch active={true} />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <div className="font-bold text-sm">اعلان تکمیل برنامه‌ریزی AI</div>
                      <div className="text-xs text-slate-50/50">وقتی هوش مصنوعی ساخت برنامه را تمام کرد به من خبر بده.</div>
                    </div>
                    <ToggleSwitch active={true} />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-bold text-sm">تخفیف‌ها و پیشنهادات ویژه</div>
                      <div className="text-xs text-slate-50/50">ارسال ایمیل‌های مارکتینگ و اخبار آپدیت‌ها.</div>
                    </div>
                    <ToggleSwitch active={false} />
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;