import { motion } from 'framer-motion';

export function AuthRightSide() {
    const features = [
        {
            title: "Kariyerini Hızlandır",
            desc: "Yeteneklerinle eşleşen en iyi projelere anında ulaş."
        },
        {
            title: "Güvenli Ödeme",
            desc: "Yaptığın işin karşılığını garanti altına al."
        },
        {
            title: "Geniş İş Ağı",
            desc: "Binlerce profesyonel ve işverenle bağlantı kur."
        },
        {
            title: "Yapay Zeka Desteği",
            desc: "Sana özel önerilerle zaman kazan."
        }
    ];

    return (
        <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-slate-50">
            <div className="absolute inset-0 h-full w-full">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center h-full px-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                        WorkFlow'da <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Neler Seni Bekliyor?
                        </span>
                    </h2>

                    <div className="space-y-4">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
                                className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all"
                            >
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
