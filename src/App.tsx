import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3, Activity, Pill, Stethoscope, FileText, RefreshCw, AlertCircle,
  CheckCircle2, Building2, TrendingUp, Download, ShieldCheck, HeartPulse,
  AlertTriangle, ArrowUpRight, ArrowLeft, PieChart, Users, BedDouble,
  IndianRupee, Briefcase, ClipboardList, Truck, Landmark, Target,
  FileBarChart, Server, Smile, Baby, Eye, FileDown, Search,
  Clock, Database, Plus, Wrench, FileClock, ArrowRightLeft,
  ShoppingCart, Send, CheckSquare, Ban, History, Upload, Info, Printer,
  X, Menu, Bone,
} from 'lucide-react';

// --- CUSTOM STYLES FOR ANIMATIONS (Replaces tailwindcss-animate) ---
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideInBottom { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
    .animate-slide-in-bottom { animation: slideInBottom 0.5s ease-out forwards; }
    
    /* Scrollbar styling for sidebar */
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #1e3a8a; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 4px; }
  `}</style>
);

// --- NOTIFICATION COMPONENT ---
const Notification = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors: Record<string, string> = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-amber-500'
  };

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColors[type] || 'bg-slate-800'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-slide-in-right border border-white/10`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-75"><X className="w-4 h-4" /></button>
    </div>
  );
};

// --- INVOICE MODAL COMPONENT ---
interface InvoiceItem {
  item: string;
  batch: string;
  excess: string;
  margin: string;
}
const InvoiceModal = ({ invoice, onClose }: { invoice: InvoiceItem | null; onClose: () => void }) => {
  if (!invoice) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-blue-100">
        <div className="bg-blue-900 p-4 border-b border-blue-800 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2"><FileText className="w-4 h-4" /> Invoice Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-blue-800 rounded-full transition-colors"><X className="w-5 h-5 text-blue-100" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-sm text-slate-500">Item</span>
            <span className="font-bold text-slate-900">{invoice.item}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-sm text-slate-500">Batch</span>
            <span className="font-mono text-sm text-slate-700 bg-slate-100 px-2 rounded">{invoice.batch}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-sm text-slate-500">Excess Amount</span>
            <span className="font-bold text-red-600">{invoice.excess}</span>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-xs text-red-700 mt-4 border border-red-100 flex items-start gap-2">
             <AlertTriangle className="w-4 h-4 shrink-0" />
             <span>Violation: Margin exceeded 7% cap (Actual: {invoice.margin}%)</span>
          </div>
          <button onClick={onClose} className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-md shadow-blue-900/20">Close Panel</button>
        </div>
      </div>
    </div>
  );
};

// --- CAPEX REQUEST MODAL ---
const CapexModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-slide-in-bottom">
                <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold flex items-center"><Landmark className="w-5 h-5 mr-2" /> New Capex Request</h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Asset Category</label>
                        <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Medical Equipment</option>
                            <option>IT Infrastructure</option>
                            <option>Facility & Plant</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <input type="text" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" placeholder="E.g. MRI Machine Upgrade" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Est. Cost (₹)</label>
                            <input type="number" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Urgency</label>
                            <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none">
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-200">Cancel</button>
                        <button onClick={onClose} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/20">Submit Request</button>
                    </div>
                </div>
             </div>
        </div>
    );
}

// --- SVG CURVE CHART ---
const SvgCurveChart = ({ data, color, id }: { data: { amount: number }[]; color: string; id: string }) => {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map(d => d.amount)) || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.amount / maxVal) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`fade-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} vectorEffect="non-scaling-stroke" />
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#fade-${id})`} opacity="0.5" />
    </svg>
  );
};

// --- DETAILS VIEW ---
const DetailsView = ({ onBack }: { onBack: () => void }) => {
  const [selectedUnit, setSelectedUnit] = useState("All Units");
  const [selectedPeriod, setSelectedPeriod] = useState("Oct 2025");

  // Mock Data for Cash Flow
  const cashFlowData = [
    { category: "A. Cash Flow from Operating Activities", items: [
      { name: "Net Profit Before Tax", value: 26.60 },
      { name: "Adjustments for: Depreciation", value: 4.10 },
      { name: "Adjustments for: Finance Costs", value: 3.20 },
      { name: "Operating Profit before Working Capital Changes", value: 33.90, isSubtotal: true },
      { name: "(Increase)/Decrease in Trade Receivables", value: -2.40 },
      { name: "(Increase)/Decrease in Inventories", value: -1.10 },
      { name: "Increase/(Decrease) in Trade Payables", value: 1.80 },
      { name: "Cash Generated from Operations", value: 32.20, isSubtotal: true },
      { name: "Direct Taxes Paid", value: -6.65 },
      { name: "Net Cash from Operating Activities", value: 25.55, isTotal: true }
    ]},
    { category: "B. Cash Flow from Investing Activities", items: [
      { name: "Purchase of Fixed Assets (Capex)", value: -9.20 },
      { name: "Proceeds from Sale of Fixed Assets", value: 0.50 },
      { name: "Interest Received", value: 0.80 },
      { name: "Net Cash used in Investing Activities", value: -7.90, isTotal: true }
    ]},
    { category: "C. Cash Flow from Financing Activities", items: [
      { name: "Proceeds from Long Term Borrowings", value: 5.00 },
      { name: "Repayment of Long Term Borrowings", value: -2.00 },
      { name: "Interest Paid", value: -3.20 },
      { name: "Net Cash from Financing Activities", value: -0.20, isTotal: true }
    ]}
  ];

  // Calculate totals for summary cards
  const netIncrease = 25.55 - 7.90 - 0.20;
  const openingBalance = 12.40;
  const closingBalance = openingBalance + netIncrease;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-slide-in-bottom">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button onClick={onBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-2 font-medium transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Detailed Cash Flow Statement
          </h2>
          <p className="text-sm text-slate-500 mt-1">Consolidated view across {selectedUnit} for {selectedPeriod}</p>
        </div>
        
        <div className="flex gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <select 
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="text-sm border-none bg-slate-50 rounded-md px-3 py-2 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option>All Units</option>
            <option>Unit 1</option>
            <option>Unit 2</option>
            <option>Unit 3</option>
          </select>
          <div className="w-px bg-slate-200 my-1"></div>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border-none bg-slate-50 rounded-md px-3 py-2 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option>Oct 2025</option>
            <option>Sep 2025</option>
            <option>Aug 2025</option>
            <option>Q2 2025</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors shadow-sm">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Net Cash Op. Activities</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">₹25.55 Cr</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Net Cash Inv. Activities</p>
          <p className="text-xl font-bold text-red-500 mt-1">-₹7.90 Cr</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Net Cash Fin. Activities</p>
          <p className="text-xl font-bold text-slate-700 mt-1">-₹0.20 Cr</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-xs text-blue-700 uppercase font-bold tracking-wider">Closing Cash Balance</p>
          <p className="text-xl font-bold text-blue-900 mt-1">₹{closingBalance.toFixed(2)} Cr</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Particulars</th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-right">Amount (₹ Cr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cashFlowData.map((section, idx) => (
                <React.Fragment key={idx}>
                  {/* Section Header */}
                  <tr className="bg-slate-50/50">
                    <td colSpan={2} className="px-6 py-3 font-bold text-blue-800 text-xs uppercase tracking-wide">
                      {section.category}
                    </td>
                  </tr>
                  {/* Items */}
                  {section.items.map((item, i) => (
                    <tr key={i} className={`hover:bg-slate-50 transition-colors ${item.isTotal ? 'bg-blue-50/30' : ''}`}>
                      <td className={`px-6 py-3 ${item.isTotal ? 'font-bold text-slate-900' : item.isSubtotal ? 'font-semibold text-slate-700 pl-8' : 'text-slate-600 pl-8'}`}>
                        {item.name}
                      </td>
                      <td className={`px-6 py-3 text-right font-mono ${item.isTotal ? 'font-bold text-slate-900' : item.value < 0 ? 'text-red-500' : 'text-slate-700'}`}>
                        {item.value < 0 ? `(${Math.abs(item.value).toFixed(2)})` : item.value.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              
              {/* Final Totals */}
              <tr className="bg-slate-50 border-t-2 border-slate-200">
                <td className="px-6 py-4 font-bold text-slate-800">Net Increase/(Decrease) in Cash (A+B+C)</td>
                <td className="px-6 py-4 text-right font-bold font-mono text-slate-900">{netIncrease.toFixed(2)}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-3 font-medium text-slate-600">Add: Opening Cash & Cash Equivalents</td>
                <td className="px-6 py-3 text-right font-mono text-slate-600">{openingBalance.toFixed(2)}</td>
              </tr>
              <tr className="bg-blue-600 text-white">
                <td className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Closing Cash & Cash Equivalents</td>
                <td className="px-6 py-4 text-right font-bold font-mono text-lg">{closingBalance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
         <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Printer className="w-4 h-4 mr-2" /> Print
         </button>
         <button className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            <Download className="w-4 h-4 mr-2" /> Export to Excel
         </button>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState('mis');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [isGeneratingCF, setIsGeneratingCF] = useState(false);
  const [cfGenerated, setCfGenerated] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [metricsType, setMetricsType] = useState('financial');
  const [isCapexModalOpen, setIsCapexModalOpen] = useState(false);
  // const [ipoChecklist, setIpoChecklist] = useState([
  //   { id: 1, text: 'Independent Directors Appointed (3/3)', completed: true },
  //   { id: 2, text: 'Audit Committee Formed', completed: true },
  //   { id: 3, text: 'RHP Filing Draft - In Review', completed: false },
  //   { id: 4, text: 'Roadshow Presentation', completed: false }
  // ]);

  // const toggleIpoItem = (id: number) => {
  //   setIpoChecklist(items => items.map(item =>
  //     item.id === id ? { ...item, completed: !item.completed } : item
  //   ));
  // };

  const showNotification = (message: string, type = 'info') => {
    setNotification({ message, type });
  };

  const handleGenerateCF = () => {
    setCfGenerated(false);
    setIsGeneratingCF(true);
    setTimeout(() => {
      setIsGeneratingCF(false);
      setCfGenerated(true);
      showNotification('Consolidated Cash Flow statement generated successfully.', 'success');
    }, 1500);
  };

  const handleExportCF = () => showNotification('Downloading "CX_Partners_CF_Format.xlsx"...', 'success');
  const handleViewInvoice = (invoice: InvoiceItem) => setSelectedInvoice(invoice);

  // --- DATA ---
  const departmentsData = [
    { name: "Critical Care Medicine", doctors: ["Dr. Minerva McGonagall", "Dr. Severus Snape"] },
    { name: "Obstetrics and Gynaecology", doctors: ["Dr. Hermione Granger", "Dr. Luna Lovegood", "Dr. Ginny Weasley"] },
    { name: "Pediatrics and Neonatology", doctors: ["Dr. Neville Longbottom", "Dr. Molly Weasley"] },
    { name: "Paediatric Urology", doctors: ["Dr. Albus Dumbledore"] },
    { name: "Orthopaedics", doctors: ["Dr. Remus Lupin", "Dr. Sirius Black"] },
    { name: "Urology And Andrology", doctors: ["Dr. Harry Potter"] },
    { name: "Ophthalmology", doctors: ["Dr. Pomona Sprout"] },
    { name: "General Surgery", doctors: ["Dr. Draco Malfoy", "Dr. Lucius Malfoy"] },
    { name: "Cardiology", doctors: ["Dr. Rubeus Hagrid", "Dr. Nymphadora Tonks"] },
    { name: "Endocrinology", doctors: ["Dr. Filius Flitwick"] },
  ];

  const monthlyBreach = [
    { month: 'Apr', amount: 0.15, color: 'bg-rose-200' },
    { month: 'May', amount: 0.18, color: 'bg-rose-200' },
    { month: 'Jun', amount: 2.00, color: 'bg-red-600' },
    { month: 'Jul', amount: 0.45, color: 'bg-red-400' },
    { month: 'Aug', amount: 0.50, color: 'bg-red-400' },
    { month: 'Sep', amount: 0.22, color: 'bg-rose-300' },
    { month: 'Oct', amount: 0.60, color: 'bg-red-500' },
    { month: 'Nov', amount: 0.25, color: 'bg-rose-200' },
    { month: 'Dec', amount: 0.15, color: 'bg-slate-200' },
    { month: 'Jan', amount: 0.20, color: 'bg-slate-200' },
    { month: 'Feb', amount: 0.35, color: 'bg-red-300' },
    { month: 'Mar', amount: 0.10, color: 'bg-slate-200' },
  ];

  const violations = [
    { month: "Apr '25", item: "MEROPENEM 1G INJ", batch: "MP25001", excess: "₹42,150", margin: "12.50", status: "CRITICAL", statusColor: "bg-red-100 text-red-700 border border-red-200" },
    { month: "May '25", item: "TIGECYCLINE 50MG", batch: "TG9921", excess: "₹28,400", margin: "9.20", status: "HIGH RISK", statusColor: "bg-red-50 text-red-600 border border-red-100" },
    { month: "Jun '25", item: "ALBUMIN 20%", batch: "ALB882", excess: "₹1,15,200", margin: "15.80", status: "CRITICAL", statusColor: "bg-red-100 text-red-700 border border-red-200" },
    { month: "Aug '25", item: "IMMUNOGLOBULIN 5G", batch: "IG5541", excess: "₹85,600", margin: "11.40", status: "CRITICAL", statusColor: "bg-red-100 text-red-700 border border-red-200" },
    { month: "Oct '25", item: "PIPERACILLIN TAZO", batch: "PTZ302", excess: "₹38,900", margin: "8.50", status: "HIGH RISK", statusColor: "bg-amber-100 text-amber-700 border border-amber-200" },
    { month: "Dec '25", item: "ENOXAPARIN 40MG", batch: "ENX441", excess: "₹22,100", margin: "7.80", status: "WARNING", statusColor: "bg-amber-50 text-amber-600 border border-amber-100" },
    { month: "Jan '26", item: "LINEZOLID 600MG", batch: "LZ6621", excess: "₹18,500", margin: "7.50", status: "WARNING", statusColor: "bg-amber-50 text-amber-600 border border-amber-100" },
    { month: "Feb '26", item: "VORICONAZOLE 200", batch: "VR2201", excess: "₹35,000", margin: "10.20", status: "HIGH RISK", statusColor: "bg-red-50 text-red-600 border border-red-100" },
    { month: "Mar '26", item: "CASPOFUNGIN 50MG", batch: "CS5592", excess: "₹92,300", margin: "14.60", status: "CRITICAL", statusColor: "bg-red-100 text-red-700 border border-red-200" },
  ];

  const units = [
    { name: 'Unit 1', revenue: 18.5, ebitda: 7.4 },
    { name: 'Unit 2', revenue: 14.2, ebitda: 5.7 },
    { name: 'Unit 3', revenue: 9.8, ebitda: 3.9 },
    { name: 'Unit 4', revenue: 7.5, ebitda: 3.0 },
    { name: 'Unit 5', revenue: 6.2, ebitda: 2.5 },
    { name: 'Unit 6', revenue: 5.5, ebitda: 2.2 },
    { name: 'Unit 7', revenue: 4.8, ebitda: 1.9 }
  ];

  const navItems = [
    { id: 'mis', icon: BarChart3, label: 'Consolidated MIS', category: 'financial' },
    { id: 'financial_stmts', icon: FileBarChart, label: 'Financial Statements', category: 'financial' },
    { id: 'metrics', icon: PieChart, label: 'Performance Metrics', category: 'financial' },
    { id: 'payouts', icon: Stethoscope, label: 'Variable Pay Engine', category: 'hr' },
    { id: 'rcm', icon: Briefcase, label: 'Revenue Cycle (RCM)', category: 'financial' },
    { id: 'pharmacy', icon: Pill, label: 'Pharmacy Management', category: 'operations' },
    { id: 'inventory', icon: Truck, label: 'Inventory & Procurement', category: 'operations' },
    { id: 'ivf', icon: Activity, label: 'Clinical Ops & SOP', category: 'clinical' },
    { id: 'doctor_portal', icon: Users, label: 'Doctor Self-Service', category: 'clinical' },
    { id: 'assets', icon: Landmark, label: 'Capex & Assets', category: 'operations' },
    { id: 'budget', icon: Target, label: 'Budget vs Actuals', category: 'financial' },
    // { id: 'ipo', icon: LayoutGrid, label: 'IPO Readiness', category: 'legal' },
    { id: 'audit', icon: ShieldCheck, label: 'Audit Trail', category: 'legal' },
    { id: 'vendor', icon: ClipboardList, label: 'Vendor Management', category: 'operations' },
    { id: 'system_health', icon: Server, label: 'System Health', category: 'tech' },
    { id: 'patient_exp', icon: Smile, label: 'Patient Experience', category: 'clinical' },
    { id: 'reports', icon: FileText, label: 'Reports Center', category: 'financial' }
  ];

  // === STABLE DATA (useMemo prevents Math.random() re-render flickering) ===
  const flatDocList = useMemo(() => {
    return departmentsData.flatMap(dept =>
      dept.doctors.map(doc => ({
        name: doc,
        dept: dept.name,
        procedures: Math.floor(Math.random() * 50) + 10,
        opd: Math.floor(Math.random() * 200) + 50,
        payout: (Math.random() * 8 + 2).toFixed(2),
        status: Math.random() > 0.8 ? 'Pending Review' : 'Ready'
      }))
    ).slice(0, 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cityData = useMemo(() => {
    const generateTrend = (base: number, variance: number) =>
      Array.from({ length: 12 }, (_, i) => {
        const seasonal = Math.sin(i / 1.5) * (variance * 0.8);
        const noise = (Math.random() * variance) - (variance / 2);
        return Math.max(10, Math.round(base + seasonal + noise));
      });

    return [
      { id: 'unit1', name: 'Unit 1', financial: { revenue: generateTrend(150, 60), ebitda: generateTrend(60, 20) }, operational: { opd: generateTrend(4500, 2500), occupancy: generateTrend(85, 20) }, color: 'bg-blue-600' },
      { id: 'unit2', name: 'Unit 2', financial: { revenue: generateTrend(110, 40), ebitda: generateTrend(44, 15) }, operational: { opd: generateTrend(3200, 1800), occupancy: generateTrend(75, 25) }, color: 'bg-emerald-600' },
      { id: 'unit3', name: 'Unit 3', financial: { revenue: generateTrend(80, 30), ebitda: generateTrend(32, 10) }, operational: { opd: generateTrend(2100, 1000), occupancy: generateTrend(65, 20) }, color: 'bg-amber-500' },
      { id: 'unit4', name: 'Unit 4', financial: { revenue: generateTrend(60, 25), ebitda: generateTrend(24, 8) }, operational: { opd: generateTrend(1800, 900), occupancy: generateTrend(60, 20) }, color: 'bg-blue-500' },
      { id: 'unit5', name: 'Unit 5', financial: { revenue: generateTrend(50, 20), ebitda: generateTrend(20, 6) }, operational: { opd: generateTrend(1500, 800), occupancy: generateTrend(55, 15) }, color: 'bg-cyan-600' },
      { id: 'unit6', name: 'Unit 6', financial: { revenue: generateTrend(40, 18), ebitda: generateTrend(16, 5) }, operational: { opd: generateTrend(1200, 600), occupancy: generateTrend(50, 10) }, color: 'bg-indigo-600' },
      { id: 'unit7', name: 'Unit 7', financial: { revenue: generateTrend(35, 15), ebitda: generateTrend(14, 4) }, operational: { opd: generateTrend(1000, 500), occupancy: generateTrend(45, 10) }, color: 'bg-rose-600' }
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // === RENDER FUNCTIONS ===

  const renderSidebar = () => (
    <div className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-blue-900 text-blue-100 flex flex-col h-screen overflow-y-auto border-r border-blue-800 custom-scrollbar transition-transform duration-300 ease-in-out shadow-2xl
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
    `}>
      <div className="p-6 bg-blue-900 flex flex-col items-center sticky top-0 z-10 border-b border-blue-800">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-blue-500/30 overflow-hidden relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute left-2.5 top-2"><Users className="text-white w-6 h-6" /></div>
            <div className="absolute right-2.5 bottom-2.5"><Baby className="text-blue-100 w-4 h-4" /></div>
          </div>
        </div>
        <h1 className="text-white font-bold text-lg text-center leading-tight tracking-wide">Project 10</h1>
        <p className="text-xs text-blue-300 font-medium mt-1 uppercase tracking-wider">Financial</p>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => { setActiveTab(item.id); setSelectedReport(null); setCurrentView('dashboard'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center px-6 py-2.5 text-sm font-medium transition-all duration-200 border-l-4 ${
                  activeTab === item.id
                    ? 'bg-blue-800 text-white border-blue-400'
                    : 'border-transparent hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <item.icon className={`w-4 h-4 mr-3 ${activeTab === item.id ? 'text-blue-300' : 'text-blue-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 text-xs text-blue-400 border-t border-blue-800 mt-auto bg-blue-900">
        <p>Tech Consultant Profile</p>
        <p className="mt-1">System Status: <span className="text-emerald-400 font-semibold">Live API</span></p>
      </div>
    </div>
  );

  const getTabLabel = () => {
    const item = navItems.find(n => n.id === activeTab);
    return item ? item.label : activeTab;
  };

  const renderTopBar = () => (
    <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden mr-4 text-slate-600 hover:text-blue-600 focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center">
          <span className="w-2 h-6 bg-blue-600 rounded-full mr-3 hidden md:block"></span>
          {getTabLabel()}
        </h2>
      </div>
      <div className="flex items-center space-x-6">
        <button onClick={handleGenerateCF} disabled={isGeneratingCF} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center transition-colors disabled:opacity-70 shadow-lg shadow-blue-600/20 active:scale-95 transform">
          {isGeneratingCF ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <TrendingUp className="w-4 h-4 mr-2" />}
          {isGeneratingCF ? 'Consolidating...' : 'Generate Cash Flow'}
        </button>
      </div>
    </div>
  );

  // === MIS TAB ===
  const renderMIS = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Consolidated Revenue', value: '₹66.5 Cr', trend: '+14%', color: 'border-blue-600', icon: 'text-blue-600' },
          { label: 'Consolidated EBITDA', value: '₹26.6 Cr', trend: '+16%', color: 'border-blue-500', icon: 'text-blue-500', note: '40% Margin Sustained' },
          { label: 'Pharmacy Cost Breach', value: '₹4.47 L', trend: '+Alert', color: 'border-red-500', icon: 'text-red-500', note: 'Exceeds 7% margin' },
          { label: 'Unreconciled Payouts', value: '₹0.00', trend: '100% Auto', color: 'border-blue-400', icon: 'text-blue-400' }
        ].map((kpi, i) => (
          <div key={i} className={`bg-white p-5 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-300 ${kpi.color}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
              <Activity className={`w-4 h-4 ${kpi.icon} opacity-50`} />
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${kpi.trend === '+Alert' ? 'text-red-700 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>{kpi.trend}</span>
            </div>
            {kpi.note && <p className="text-xs text-slate-400 mt-2 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> {kpi.note}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center"><Building2 className="w-5 h-5 mr-2 text-blue-600" /> Automated Unit-Wise Consolidation</h3>
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">Real-time TB Sync</span>
          </div>
          <div className="space-y-5">
            {units.map((unit, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-900">{unit.name}</span>
                  <span className="text-slate-500">₹{unit.revenue} Cr Rev / ₹{unit.ebitda} Cr EBITDA</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 flex overflow-hidden">
                  <div className="bg-blue-900 h-2.5 rounded-l-full" style={{ width: `${(unit.revenue / 20) * 100}%` }}></div>
                  <div className="bg-blue-400 h-2.5 rounded-r-full" style={{ width: `${(unit.ebitda / 20) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mt-4 text-xs">
            <span className="flex items-center"><span className="w-3 h-3 rounded bg-blue-900 mr-1.5"></span>Revenue</span>
            <span className="flex items-center"><span className="w-3 h-3 rounded bg-blue-400 mr-1.5"></span>EBITDA</span>
          </div>
        </div>

        <div className="bg-blue-900 rounded-xl shadow-lg shadow-blue-700/20 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
          <h3 className="text-lg font-bold mb-4 flex items-center relative z-10"><RefreshCw className="w-5 h-5 mr-2 text-blue-200" /> Cash Flow Automation</h3>
          {cfGenerated ? (
            <div className="space-y-4 animate-slide-in-bottom relative z-10">
              <div className="p-3 bg-white/10 border border-white/20 rounded-lg flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 mr-2" />
                  <div><p className="text-sm font-medium text-white">Process Complete</p><p className="text-xs text-blue-100">Statement generated successfully.</p></div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setCurrentView('details')} className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-lg text-sm font-medium flex justify-center items-center transition-colors"><Eye className="w-4 h-4 mr-2" /> View Details</button>
                <button onClick={handleExportCF} className="flex-1 bg-white text-blue-900 hover:bg-blue-50 py-2.5 rounded-lg text-sm font-bold flex justify-center items-center transition-colors shadow-lg"><FileDown className="w-4 h-4 mr-2" /> Export Report</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-blue-100 relative z-10">
              <FileText className="w-12 h-12 mb-3 opacity-30 text-white" />
              <p className="text-sm text-blue-100">Consolidated CF not generated yet for current period.</p>
              <p className="text-xs mt-2 text-blue-200">Click "Generate Cash Flow" above.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-red-500" /> Consolidated Pharmacy Cost Breach Trend (Apr 2025 - Mar 2026)</h3>
          <span className="text-sm font-medium text-slate-500">Total Excess: <span className="text-red-600 font-bold">₹4.47 L</span></span>
        </div>
        <div className="h-48 w-full bg-slate-50 rounded border border-slate-100 flex items-end p-4 space-x-4 relative overflow-hidden">
          <div className="absolute inset-0 p-4 pointer-events-none opacity-50">
            <SvgCurveChart data={monthlyBreach.filter(m => m.amount > 0)} color="#e11d48" id="mis-breach" />
          </div>
          {monthlyBreach.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
              <div className="absolute -top-10 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">₹{item.amount}L</div>
              <div className={`w-full ${item.color} rounded-t-sm transition-all duration-500`} style={{ height: `${(item.amount / 2.0) * 100}%`, minHeight: '4px' }}></div>
              <div className="text-xs font-medium text-slate-500 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">Aggregated analysis of purchase margins exceeding 7% cap. Peak breach observed in June 2025 (₹2.0L).</p>
      </div>
    </div>
  );

  // === PHARMACY TAB ===
  const renderPharmacy = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white flex items-center mb-6"><HeartPulse className="w-7 h-7 mr-3 text-blue-200" /> Pharmacy Margin Forensic Audit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-xs text-blue-100 uppercase tracking-wider">Total Excess Payout</p>
              <p className="text-2xl font-bold text-white mt-1">₹4.47 Lakhs</p>
              <p className="text-xs text-blue-200 mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Apr 2025 - Mar 2026</p>
            </div>
            <div className="col-span-2 text-sm text-blue-50 leading-relaxed">
              <p className="mb-2"><strong className="text-white">Observation:</strong> Significant margin breach detected, peaking in <strong>June 2025 (₹2.0L)</strong> and <strong>Feb (₹0.35L)</strong>.</p>
              <p><strong className="text-blue-100">Root Cause:</strong> Procurement of high-value biologicals consistently bypassed the 7% markup ceiling due to delayed synchronization of the vendor rate contract master.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> Monthly Margin Breach Trend</h3>
          <div className="flex items-center space-x-2 text-sm font-medium bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span><span>Audit Flag Active</span>
          </div>
        </div>
        <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Monthly Excess Payout (In Lakhs)</h4>
          <div className="flex items-end space-x-2 md:space-x-3 h-40 min-w-[600px] relative">
            <div className="absolute inset-0 p-0 pointer-events-none opacity-50 z-20">
              <SvgCurveChart data={monthlyBreach} color="#e11d48" id="pharmacy-breach" />
            </div>
            {monthlyBreach.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
                <div className="absolute -top-8 text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm border border-slate-100 z-10">₹{item.amount}L</div>
                <div className={`w-full rounded-t-sm transition-all hover:brightness-110 ${item.color}`} style={{ height: item.amount > 0 ? `${(item.amount / 2.0) * 100}%` : '4px' }}></div>
                <div className="text-xs font-medium text-slate-500 mt-2">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <h4 className="text-sm font-bold text-slate-900 mb-3">High Value Violations ({'>'} ₹30k Excess)</h4>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-3 font-medium rounded-tl-lg">Month</th>
                <th className="p-3 font-medium">Item Name</th>
                <th className="p-3 font-medium">Batch No.</th>
                <th className="p-3 font-medium text-right">Margin %</th>
                <th className="p-3 font-medium text-right">Excess Amt</th>
                <th className="p-3 font-medium">Action</th>
                <th className="p-3 font-medium rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {violations.map((v, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-red-50/30">
                  <td className="p-3 font-medium text-slate-600">{v.month}</td>
                  <td className="p-3 font-bold text-slate-900">{v.item}</td>
                  <td className="p-3 font-mono text-xs text-slate-500">{v.batch}</td>
                  <td className="p-3 font-bold text-red-600 text-right">{v.margin}%</td>
                  <td className="p-3 font-bold text-red-600 text-right">{v.excess}</td>
                  <td className="p-3"><button onClick={() => handleViewInvoice(v)} className="text-blue-600 hover:underline text-xs flex items-center">View Invoice <ArrowUpRight className="w-3 h-3 ml-1" /></button></td>
                  <td className="p-3"><span className={`${v.statusColor} px-2 py-1 rounded text-xs font-bold`}>{v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // === METRICS TAB ===
  const renderMetrics = () => {
    const totalRev = cityData.reduce((acc, city) => acc + city.financial.revenue.reduce((a, b) => a + b, 0), 0);
    const totalOpd = cityData.reduce((acc, city) => acc + city.operational.opd.reduce((a, b) => a + b, 0), 0);
    const currentValues = cityData.flatMap(city => metricsType === 'financial' ? city.financial.revenue : city.operational.opd);
    const maxValue = Math.max(...currentValues) * 1.1;
    const pieGradient = `conic-gradient(#2563eb 0% 40%, #059669 40% 67%, #d97706 67% 84%, #3b82f6 84% 100%)`;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center"><PieChart className="w-6 h-6 mr-2 text-blue-600" /> Annual Performance Metrics (2025)</h3>
            <p className="text-sm text-slate-500 mt-1">Comprehensive 12-month analysis across all hospital units.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setMetricsType('financial')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${metricsType === 'financial' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Financial (Revenue/EBITDA)</button>
            <button onClick={() => setMetricsType('operational')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${metricsType === 'operational' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Operational (OPD/Occupancy)</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase">Revenue Share</h4>
            <div className="w-32 h-32 rounded-full relative shadow-inner" style={{ background: pieGradient }}>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center"><span className="text-xs font-bold text-slate-400">By Unit</span></div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4 text-[10px]">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-600 mr-1"></span>Unit 1</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>Unit 2</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>Unit 3</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>Unit 4</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-600 mr-1"></span>Unit 5</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-600 mr-1"></span>Unit 6</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-600 mr-1"></span>Unit 7</span>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Annual Revenue</p>
              <div className="flex items-baseline mt-2"><IndianRupee className="w-5 h-5 text-slate-400 mr-1" /><h3 className="text-3xl font-bold text-slate-900">{(totalRev / 10).toFixed(1)} Cr</h3></div>
              <p className="text-xs text-green-600 mt-2 font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +14% YoY Growth</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Annual OPD</p>
              <div className="flex items-baseline mt-2"><Users className="w-5 h-5 text-slate-400 mr-1" /><h3 className="text-3xl font-bold text-slate-900">{totalOpd.toLocaleString()}</h3></div>
              <p className="text-xs text-green-600 mt-2 font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +8.5% YoY Growth</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Avg. Bed Occupancy</p>
              <div className="flex items-baseline mt-2"><BedDouble className="w-5 h-5 text-slate-400 mr-1" /><h3 className="text-3xl font-bold text-slate-900">72.4%</h3></div>
              <p className="text-xs text-slate-400 mt-2">Target: 75%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cityData.map((city) => (
            <div key={city.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-lg text-slate-900 flex items-center"><Building2 className={`w-5 h-5 mr-2 ${city.color.replace('bg-', 'text-')}`} />{city.name}</h4>
                <div className={`text-xs px-2 py-1 rounded text-white font-bold ${city.color}`}>{metricsType === 'financial' ? 'Rev Trend' : 'OPD Trend'}</div>
              </div>
              <div className="h-64 flex items-end space-x-2 mb-4 pt-6 pb-2 border-b border-slate-50 relative">
                {(metricsType === 'financial' ? city.financial.revenue : city.operational.opd).map((val, idx) => (
                  <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center group relative z-10">
                    <div className="mb-1 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 bg-white px-1 shadow-sm rounded border border-slate-100">{val}</div>
                    <div className={`w-full rounded-t-sm transition-all duration-500 hover:brightness-110 ${city.color}`} style={{ height: `${(val / maxValue) * 100}%`, minHeight: '4px' }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">{months.map(m => <span key={m}>{m}</span>)}</div>
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">{metricsType === 'financial' ? 'Total Revenue' : 'Total OPD'}</p>
                  <p className="text-lg font-bold text-slate-700">{metricsType === 'financial' ? `₹${city.financial.revenue.reduce((a, b) => a + b, 0).toFixed(1)} L` : city.operational.opd.reduce((a, b) => a + b, 0).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase">{metricsType === 'financial' ? 'EBITDA Margin' : 'Avg Occupancy'}</p>
                  <p className={`text-lg font-bold ${metricsType === 'financial' ? 'text-green-600' : 'text-blue-600'}`}>{metricsType === 'financial' ? '40%' : `${Math.round(city.operational.occupancy.reduce((a, b) => a + b, 0) / 12)}%`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === FINANCIAL STATEMENTS ===
  const renderFinancialStmts = () => {
    const pnlData = [
      { item: "I. Revenue from Operations", current: "66.50", prev: "58.00", change: "+14.6%" },
      { item: "II. Other Income", current: "1.40", prev: "1.10", change: "+27.2%" },
      { item: "III. Total Income (I + II)", current: "67.90", prev: "59.10", change: "+14.9%", isBold: true },
      { item: "IV. Expenses:", isHeader: true },
      { item: "   Cost of Materials Consumed", current: "16.50", prev: "14.20", change: "+16.2%" },
      { item: "   Employee Benefit Expenses", current: "12.00", prev: "10.50", change: "+14.3%" },
      { item: "   Finance Costs", current: "3.20", prev: "2.90", change: "+10.3%", note: "Incl. Lease Interest" },
      { item: "   Depreciation & Amortization", current: "4.10", prev: "3.80", change: "+7.9%", note: "Incl. ROU Asset Depr" },
      { item: "   Other Expenses", current: "5.50", prev: "5.10", change: "+7.8%", note: "Rent Reclassified" },
      { item: "V. Total Expenses", current: "41.30", prev: "36.50", change: "+13.1%", isBold: true },
      { item: "VI. Profit Before Tax (III - V)", current: "26.60", prev: "22.60", change: "+17.7%", isBold: true, color: "text-emerald-700" },
      { item: "VII. Tax Expense (25%)", current: "6.65", prev: "5.65", change: "+17.7%" },
      { item: "VIII. Profit After Tax (PAT)", current: "19.95", prev: "16.95", change: "+17.7%", isBold: true, color: "text-slate-900 text-lg" },
    ];

    const MAX_HEIGHT_PX = 150;
    const MAX_VAL = 70;
    const scale = (val: number) => (val / MAX_VAL) * MAX_HEIGHT_PX;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center"><FileBarChart className="w-5 h-5 mr-2 text-blue-600" /> Statement of Profit & Loss (Consolidated)</h3>
              <p className="text-xs text-slate-500 mt-1">Consolidated view for Project 10 Hospitals (All Units)</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => showNotification("Opening Detailed Notes to Accounts...", "info")} className="flex items-center px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"><FileText className="w-3 h-3 mr-2" /> View Notes</button>
              <button onClick={() => showNotification(`Downloading Consolidated_ScheduleIII.pdf...`, "success")} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"><Download className="w-3 h-3 mr-2" /> Schedule III PDF</button>
            </div>
          </div>

          <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-6">Cost & Profit Breakdown (Relative Magnitude)</h4>
            <div className="relative h-[200px] min-w-[600px] border-b border-slate-300">
              <div className="absolute bottom-0 left-0 w-full h-[180px] flex items-end justify-between px-4">
                {[
                  { label: 'Revenue', value: 66.5, color: 'bg-blue-600' },
                  { label: 'Direct Costs', value: 16.5, color: 'bg-blue-300' },
                  { label: 'Opex', value: 17.5, color: 'bg-blue-300' },
                  { label: 'Fin/Depr', value: 7.3, color: 'bg-blue-200' },
                  { label: 'Tax', value: 6.6, color: 'bg-blue-200' },
                  { label: 'Net Profit', value: 19.9, color: 'bg-emerald-500' },
                ].map((bar, i) => (
                  <div key={i} className="w-20 h-full flex flex-col justify-end items-center group">
                    <div className={`w-full ${bar.color} rounded-t-sm relative transition-all hover:brightness-110`} style={{ height: `${scale(bar.value)}px` }}>
                      <div className="absolute -top-6 w-full text-center text-xs font-bold text-slate-700">{i === 0 || i === 5 ? '₹' : ''}{bar.value}</div>
                    </div>
                    <div className={`absolute -bottom-8 w-full text-center text-[10px] font-bold ${i === 5 ? 'text-emerald-700' : 'text-slate-500'}`}>{bar.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-700">Detailed Statement</span>
                <span className="text-xs text-slate-500">Values in ₹ Crores</span>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="p-3 font-medium">Particulars</th>
                    <th className="p-3 font-medium text-right">Current Year</th>
                    <th className="p-3 font-medium text-right">Prev Year</th>
                    <th className="p-3 font-medium text-right">YoY %</th>
                  </tr>
                </thead>
                <tbody>
                  {pnlData.map((row: any, index) => (
                    'isHeader' in row && row.isHeader ? (
                      <tr key={index} className="bg-slate-50/50">
                        <td colSpan={4} className="p-3 font-bold text-slate-700 text-xs uppercase tracking-wide">{row.item}</td>
                      </tr>
                    ) : (
                      <tr key={index} className={`border-b border-slate-50 hover:bg-slate-50 ${'isBold' in row && row.isBold ? 'bg-slate-50/30' : ''}`}>
                        <td className={`p-3 ${'isBold' in row && row.isBold ? 'font-bold' : 'pl-6 text-slate-600'} ${'color' in row && row.color ? row.color : 'text-slate-800'}`}>
                          {row.item}
                          {'note' in row && row.note && <span className="ml-2 text-[9px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded border border-yellow-200">{row.note}</span>}
                        </td>
                        <td className={`p-3 text-right ${'isBold' in row && row.isBold ? 'font-bold' : 'font-mono text-slate-600'}`}>{'current' in row ? row.current : ''}</td>
                        <td className="p-3 text-right font-mono text-slate-400">{'prev' in row ? row.prev : ''}</td>
                        <td className={`p-3 text-right text-xs font-bold ${'change' in row && row.change?.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{'change' in row ? row.change : ''}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-sm text-slate-700 mb-4 flex items-center"><Activity className="w-4 h-4 mr-2 text-blue-600" /> Working Capital Cycle</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Inventory Days (DIO)</span><span className="font-bold text-slate-800">42 Days</span></div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '45%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Receivable Days (DSO)</span><span className="font-bold text-slate-800">28 Days</span></div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '30%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Payable Days (DPO)</span><span className="font-bold text-slate-800">60 Days</span></div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div></div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Cash Conversion Cycle</span>
                    <p className="text-xl font-bold text-slate-900">10 Days</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-bold text-xs text-blue-800 uppercase mb-3">Auditor's Note</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  EBITDA margin maintained at 40% driven by efficient cost management. IND AS transition in progress for IPO readiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === RCM TAB ===
  const renderRCM = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-blue-600" /> Revenue Cycle Management</h3>
          <div className="flex space-x-2">
            <button onClick={() => showNotification('Generating Denial Root Cause Analysis Report...', 'info')} className="flex items-center px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"><FileBarChart className="w-3 h-3 mr-2" /> Denial Analysis</button>
            <button onClick={() => showNotification('Batch #9921 submitted to Clearing House (142 Claims).', 'success')} className="flex items-center px-3 py-2 bg-blue-600 text-white border border-blue-600 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"><Send className="w-3 h-3 mr-2" /> Submit Batch</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-600 font-medium">Claims Pending ({'>'}90 Days)</p>
            <div className="flex justify-between items-end mt-1"><p className="text-2xl font-bold text-blue-900">₹1.2 Cr</p><button onClick={() => showNotification("Filtered list: 90+ days aging claims.", "info")} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">View List</button></div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-xs text-red-600 font-medium">Claim Rejection Rate</p>
            <p className="text-2xl font-bold text-red-900 mt-1">4.2%</p>
            <p className="text-[10px] text-red-400 mt-1">Target: &lt; 2.5%</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-xs text-emerald-600 font-medium">Collection Efficiency</p>
            <p className="text-2xl font-bold text-emerald-900 mt-1">92%</p>
            <p className="text-[10px] text-emerald-500 mt-1">MoM: +1.5%</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <p className="text-xs text-indigo-600 font-medium">Avg Days to Payment</p>
            <p className="text-2xl font-bold text-indigo-900 mt-1">45 Days</p>
            <p className="text-[10px] text-indigo-500 mt-1">Benchmark: 40 Days</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center"><AlertCircle className="w-4 h-4 mr-2 text-red-500" /> Actionable High-Value Denials</h4>
            <div className="space-y-3">
              {[
                { id: 'CLM-9921', type: 'TPA', reason: 'Authorization Missing', amount: '₹45,000', action: 'Appeal', msg: "Appeal initiated for CLM-9921." },
                { id: 'CLM-8820', type: 'Ins', reason: 'Medical Necessity', amount: '₹1.2 L', action: 'Attach Notes', msg: "Opening Clinical Notes for CLM-8820..." },
                { id: 'CLM-7712', type: 'Govt', reason: 'Invalid ID', amount: '₹22,500', action: 'Correct ID', msg: "Flagging Patient Registration for correction..." },
              ].map(claim => (
                <div key={claim.id} className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100 hover:bg-slate-100">
                  <div><span className="text-xs font-bold text-slate-700 block">Claim #{claim.id} ({claim.type})</span><span className="text-[10px] text-red-500">Reason: {claim.reason}</span></div>
                  <div className="text-right"><p className="text-sm font-bold text-slate-800">{claim.amount}</p><button onClick={() => showNotification(claim.msg, "success")} className="text-[10px] text-blue-600 font-bold hover:underline">{claim.action}</button></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-bold text-slate-700 mb-4">Aging Analysis (Days Outstanding)</h4>
            <div className="relative h-48 w-full pt-4">
              <div className="absolute inset-0 flex items-end justify-between px-4 z-10">
                {[{ h: '60%', val: '₹4.2 Cr', color: 'bg-emerald-400', label: '0-30' }, { h: '30%', val: '₹2.1 Cr', color: 'bg-blue-400', label: '31-60' }, { h: '15%', val: '₹1.1 Cr', color: 'bg-amber-400', label: '61-90' }, { h: '25%', val: '₹1.8 Cr', color: 'bg-red-400', label: '90+' }].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group h-full relative">
                    <span className="absolute -top-6 text-xs font-bold text-slate-700">{bar.val}</span>
                    <div className={`w-12 ${bar.color} rounded-t hover:opacity-80 transition-opacity cursor-pointer`} style={{ height: bar.h }}></div>
                    <span className={`text-xs text-slate-500 mt-2 font-medium ${i === 3 ? 'text-red-600' : ''}`}>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // === INVENTORY TAB ===
  const renderInventory = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><Truck className="w-5 h-5 mr-2 text-amber-500" /> Inventory & Procurement Intelligence</h3>
          <button onClick={() => showNotification("Initiating Smart Reorder for 12 critical items...", "info")} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"><ShoppingCart className="w-3 h-3 mr-2" /> Smart Reorder</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="p-4 border border-red-200 bg-red-50/50 rounded-lg lg:col-span-2">
            <h4 className="font-bold text-red-900 text-sm mb-3 flex items-center justify-between"><span className="flex items-center"><AlertCircle className="w-4 h-4 mr-2" /> Critical Stock Alerts</span><span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Action Required</span></h4>
            <ul className="text-sm space-y-3">
              <li className="flex justify-between items-center bg-white p-2.5 rounded shadow-sm border border-red-100">
                <div><span className="font-bold text-slate-700 block">Recagon 300IU</span><span className="text-xs text-red-500">Stock: 12 Units (Min: 20)</span></div>
                <button onClick={() => showNotification("PO Created for Recagon 300IU.", "success")} className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200 transition-colors"><Plus className="w-3 h-3 mr-1" /> Order</button>
              </li>
              <li className="flex justify-between items-center bg-white p-2.5 rounded shadow-sm border border-red-100">
                <div><span className="font-bold text-slate-700 block">Meropenem Inj</span><span className="text-xs text-red-500">Expiry: 24 days</span></div>
                <button onClick={() => showNotification("Initiating Return to Vendor...", "warning")} className="flex items-center px-2 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-bold hover:bg-slate-200 transition-colors"><ArrowRightLeft className="w-3 h-3 mr-1" /> Return</button>
              </li>
            </ul>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-lg">
            <h4 className="font-bold text-blue-900 text-sm mb-3 flex items-center"><ClipboardList className="w-4 h-4 mr-2" /> Active Purchase Orders</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white p-2.5 rounded shadow-sm border border-blue-100">
                <div><span className="font-bold text-slate-700 block text-xs">PO #9001 - Pharmacy Central</span><span className="text-[10px] text-blue-500">Status: Dispatched</span></div>
                <button onClick={() => showNotification("Tracking: Expected Delivery Tomorrow.", "info")} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium hover:bg-blue-200">Track</button>
              </div>
              <div className="flex justify-between items-center bg-white p-2.5 rounded shadow-sm border border-blue-100">
                <div><span className="font-bold text-slate-700 block text-xs">PO #9003 - Consumables Inc</span><span className="text-[10px] text-amber-500">Status: Pending Approval</span></div>
                <button onClick={() => showNotification("Reminder sent to Finance Head.", "success")} className="text-[10px] border border-slate-300 text-slate-600 px-2 py-1 rounded font-medium hover:bg-slate-100">Nudge</button>
              </div>
            </div>
          </div>
          <div className="p-4 border border-amber-200 bg-amber-50/50 rounded-lg">
             <h4 className="font-bold text-amber-900 text-sm mb-3 flex items-center"><Clock className="w-4 h-4 mr-2" /> Near Expiry Risk</h4>
             <div className="flex flex-col justify-center h-full space-y-3">
                <div className="flex justify-between items-center">
                   <span className="text-xs text-amber-800">Value at Risk (&lt;3m)</span>
                   <span className="font-bold text-red-600">₹4.2 L</span>
                </div>
                <div className="w-full bg-white h-2 rounded-full border border-amber-100">
                   <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <button onClick={() => showNotification("Liquidation Plan generated for high-risk stock.", "warning")} className="text-xs text-center bg-white border border-amber-300 text-amber-700 py-1.5 rounded hover:bg-amber-100 transition-colors">Generate Liquidation Plan</button>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-700 text-sm mb-3">Category-wise Stock Value</h4>
            <div className="flex items-center space-x-4">
               <div className="w-32 h-32 rounded-full border-4 border-slate-100 flex items-center justify-center relative" style={{ background: 'conic-gradient(#3b82f6 0% 45%, #10b981 45% 75%, #f59e0b 75% 100%)' }}>
                  <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                     <span className="text-xs text-slate-400">Total</span>
                     <span className="font-bold text-slate-800">₹8.5 Cr</span>
                  </div>
               </div>
               <div className="space-y-2 text-xs flex-1">
                  <div className="flex justify-between"><span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Pharmacy</span><span className="font-bold">₹3.8 Cr (45%)</span></div>
                  <div className="flex justify-between"><span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Implants/Consumables</span><span className="font-bold">₹2.5 Cr (30%)</span></div>
                  <div className="flex justify-between"><span className="flex items-center"><span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>General Stores</span><span className="font-bold">₹2.2 Cr (25%)</span></div>
               </div>
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-700 text-sm mb-3">Top Consumption Trends (This Month)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded border border-slate-100"><div className="p-2 bg-blue-100 rounded text-blue-600"><Pill className="w-4 h-4" /></div><div><p className="text-xs text-slate-500">Antibiotics</p><p className="font-bold text-sm text-slate-800">+12% Vol</p></div></div>
              <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded border border-slate-100"><div className="p-2 bg-blue-100 rounded text-blue-600"><Activity className="w-4 h-4" /></div><div><p className="text-xs text-slate-500">IVF Media</p><p className="font-bold text-sm text-slate-800">+5% Vol</p></div></div>
              <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded border border-slate-100"><div className="p-2 bg-amber-100 rounded text-amber-600"><AlertTriangle className="w-4 h-4" /></div><div><p className="text-xs text-slate-500">Narcotics</p><p className="font-bold text-sm text-red-500">-2% (Audit)</p></div></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center"><History className="w-4 h-4 mr-2 text-slate-500" /> Slow Moving Inventory ({'>'}90 Days)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-2">Item Name</th>
                    <th className="p-2 text-right">Stock Qty</th>
                    <th className="p-2 text-right">Value</th>
                    <th className="p-2 text-right">Last Issued</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2 font-medium text-slate-700">Orthopedic Drill Bit 2.5mm</td>
                    <td className="p-2 text-right text-slate-600">45</td>
                    <td className="p-2 text-right font-bold text-slate-800">₹1.2 L</td>
                    <td className="p-2 text-right text-slate-500">120 days ago</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-700">Contrast Media 100ml</td>
                    <td className="p-2 text-right text-slate-600">18</td>
                    <td className="p-2 text-right font-bold text-slate-800">₹45 K</td>
                    <td className="p-2 text-right text-slate-500">95 days ago</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-700">Pediatric Et Tube 3.0</td>
                    <td className="p-2 text-right text-slate-600">60</td>
                    <td className="p-2 text-right font-bold text-slate-800">₹12 K</td>
                    <td className="p-2 text-right text-slate-500">105 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg bg-white">
             <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center"><BarChart3 className="w-4 h-4 mr-2 text-blue-600" /> Procurement Efficiency Metrics</h4>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Vendor Fill Rate</span>
                      <span className="font-bold text-emerald-600">92% <span className="text-slate-400 font-normal">(Target: 95%)</span></span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Average Lead Time</span>
                      <span className="font-bold text-blue-600">4.5 Days <span className="text-slate-400 font-normal">(Target: 3 Days)</span></span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Emergency Purchases (Last Month)</span>
                      <span className="font-bold text-amber-600">12% <span className="text-slate-400 font-normal">(Target: &lt;5%)</span></span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  // === CLINICAL OPS ===
  const renderIVF = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center mb-6"><Activity className="w-5 h-5 mr-2 text-rose-600" /> Clinical Operations & SOP Tracking</h3>
        <p className="text-sm text-slate-500 mb-6">Tracking clinical compliance, protocols, and outcomes across key specialties.</p>
        
        {/* IVF Section */}
        <div className="mb-8">
           <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center"><Baby className="w-4 h-4 mr-2 text-blue-600" /> IVF / Reproductive Medicine</h4>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
             <div className="p-5 bg-pink-50 rounded-xl border border-pink-100"><p className="text-sm font-medium text-pink-800">Active Cycles</p><h4 className="text-3xl font-bold text-pink-600 mt-2">42</h4></div>
             <div className="p-5 bg-blue-50 rounded-xl border border-blue-100"><p className="text-sm font-medium text-blue-800">SOP Compliance Rate</p><h4 className="text-3xl font-bold text-blue-600 mt-2">100%</h4></div>
             <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-center items-center">
                <p className="text-xs text-slate-500 uppercase mb-1">Overall Success Rate</p>
                <p className="text-4xl font-bold text-emerald-600">42%</p>
                <p className="text-[10px] text-slate-400 mt-1">National Avg: 35%</p>
             </div>
           </div>
           <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto">
             <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase">Cycle Stage Funnel</h4>
             <div className="flex items-center space-x-2 min-w-[500px]">
               <div className="flex-1 text-center"><div className="bg-blue-100 py-3 rounded-l-lg border-r border-blue-200 text-blue-700 font-bold text-sm">Registration (42)</div></div>
               <div className="flex-1 text-center"><div className="bg-blue-200 py-3 border-r border-blue-300 text-blue-800 font-bold text-sm">Stimulation (30)</div></div>
               <div className="flex-1 text-center"><div className="bg-blue-300 py-3 border-r border-blue-400 text-blue-900 font-bold text-sm">Egg Pickup (18)</div></div>
               <div className="flex-1 text-center"><div className="bg-blue-600 py-3 rounded-r-lg text-white font-bold text-sm">Transfer (12)</div></div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           {/* Cardiology Section */}
           <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center"><HeartPulse className="w-4 h-4 mr-2 text-red-600" /> Cardiology Metrics</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-600">Door-to-Balloon Time (Avg)</span>
                    <span className="font-bold text-emerald-600">52 mins <span className="text-xs font-normal text-slate-400">(Target: &lt;90)</span></span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-600">Cath Lab Utilization</span>
                    <span className="font-bold text-blue-600">78%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Readmission Rate (30 Days)</span>
                    <span className="font-bold text-slate-800">1.2%</span>
                 </div>
              </div>
           </div>

           {/* Orthopedics Section */}
           <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center"><Bone className="w-4 h-4 mr-2 text-amber-600" /> Orthopaedics & Trauma</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-600">Surgical Site Infection Rate</span>
                    <span className="font-bold text-emerald-600">0.0% <span className="text-xs font-normal text-slate-400">(Last 3 mo)</span></span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-600">Implant Registry Compliance</span>
                    <span className="font-bold text-emerald-600">100%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Avg Length of Stay (TKR)</span>
                    <span className="font-bold text-slate-800">3.5 Days</span>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="mt-6 flex space-x-4">
           <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-lg border border-emerald-100 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-2" /> Antibiotic Stewardship Protocol: <strong>Compliant (98%)</strong>
           </div>
           <div className="bg-blue-50 text-blue-800 text-xs px-3 py-2 rounded-lg border border-blue-100 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-2" /> Surgical Safety Checklist Adherence: <strong>100%</strong>
           </div>
        </div>
      </div>
    </div>
  );

  // === DOCTOR PORTAL ===
  const renderDoctorPortal = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center"><Users className="w-5 h-5 mr-2 text-blue-600" /> Doctor Self-Service Portal</h3>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-blue-900 font-medium">Logged in as: <span className="font-bold text-lg block">Dr. Hermione Granger - OBGYN (ID: 8842)</span></p>
            <div className="text-right"><p className="text-xs text-blue-700 uppercase tracking-wider">Current Month Payout</p><p className="text-2xl font-bold text-blue-700">₹4.2 Lakhs</p></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><p className="text-xs text-slate-500 uppercase">OPD Consultations</p><p className="font-bold text-blue-600 text-xl">452</p><p className="text-[10px] text-green-600">▲ 12 vs last month</p></div>
            <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><p className="text-xs text-slate-500 uppercase">Surgeries / Proc</p><p className="font-bold text-blue-600 text-xl">18</p><p className="text-[10px] text-slate-400">Target: 20</p></div>
            <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><p className="text-xs text-slate-500 uppercase">Patient NPS</p><p className="font-bold text-emerald-600 text-xl">9.2</p><p className="text-[10px] text-slate-400">Top 5% in Dept</p></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-slate-700 mb-3">Upcoming Surgeries (Next 48h)</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center pb-2 border-b border-slate-100"><div><span className="font-semibold block">C-Section (Elective)</span><span className="text-xs text-slate-500">Mrs. Lily Potter | UHID: 99281</span></div><span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Tom 09:00</span></li>
              <li className="flex justify-between items-center pb-2 border-b border-slate-100"><div><span className="font-semibold block">Laparoscopic Myomectomy</span><span className="text-xs text-slate-500">Ms. Bellatrix Lestrange | UHID: 88102</span></div><span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Tom 14:00</span></li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-slate-700 mb-3">Recent Patient Feedback</h4>
            <div className="space-y-3">
              <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 italic border border-slate-100">"Dr. Hermione was extremely patient and explained the procedure very well."<div className="mt-1 flex text-yellow-400">★★★★★</div></div>
              <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 italic border border-slate-100">"Wait time was a bit long, but the consultation was good."<div className="mt-1 flex text-yellow-400">★★★★☆</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // === ASSETS TAB ===
  const renderAssets = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><Landmark className="w-5 h-5 mr-2 text-blue-600" /> Capex & Asset Management</h3>
          <button onClick={() => setIsCapexModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"><Plus className="w-4 h-4 mr-2" /> New Capex Request</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg"><p className="text-xs text-slate-500 uppercase mb-2 font-bold">Asset Lifecycle Distribution</p><div className="flex items-end space-x-2 h-16"><div className="flex-1 bg-emerald-400 rounded-t h-[30%] flex justify-center items-end text-[10px] pb-1 text-white font-bold">New</div><div className="flex-1 bg-blue-400 rounded-t h-[50%] flex justify-center items-end text-[10px] pb-1 text-white font-bold">Mid</div><div className="flex-1 bg-amber-400 rounded-t h-[20%] flex justify-center items-end text-[10px] pb-1 text-white font-bold">End</div></div></div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg"><p className="text-xs text-slate-500 uppercase mb-2 font-bold">FY25 Capex Utilization</p><div className="flex items-center justify-center h-16"><div className="text-center"><p className="text-2xl font-bold text-slate-900">₹9.2 Cr</p><p className="text-xs text-slate-400">of ₹15.0 Cr Budget</p></div></div></div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg"><p className="text-xs text-slate-500 uppercase mb-2 font-bold">Pending Approvals</p><div className="flex flex-col justify-center h-16 space-y-2"><div className="flex justify-between text-xs"><span>Radiology Upgrade</span><span className="text-amber-600 font-bold">L2 Pending</span></div><div className="flex justify-between text-xs"><span>OT Lights (Unit 2)</span><span className="text-blue-600 font-bold">Finance Review</span></div></div></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr><th className="p-3">Asset Name</th><th className="p-3">Location</th><th className="p-3">Status</th><th className="p-3 text-right">Utilization</th><th className="p-3 text-right">Next Maintenance</th><th className="p-3 text-center">Actions</th></tr>
            </thead>
            <tbody>
              {[
                { name: 'MRI Machine (3T)', sub: 'Siemens Magnetom', loc: 'Unit 1 - Radiology', status: 'Active', util: 88, next: '15 Nov 2025', statusColor: 'bg-emerald-100 text-emerald-700', barColor: 'bg-emerald-500' },
                { name: 'CT Scanner', sub: 'GE Revolution', loc: 'Unit 2 - Radiology', status: 'Active', util: 72, next: '02 Dec 2025', statusColor: 'bg-emerald-100 text-emerald-700', barColor: 'bg-blue-500' },
                { name: 'IVF Incubator #4', sub: 'K-Systems', loc: 'Unit 1 - IVF Lab', status: 'Maintenance', util: 0, next: 'Overdue', statusColor: 'bg-amber-100 text-amber-700', barColor: '' },
              ].map((asset, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 group">
                  <td className="p-3"><span className="font-medium block text-slate-900">{asset.name}</span><span className="text-[10px] text-slate-400">{asset.sub}</span></td>
                  <td className="p-3 text-slate-600">{asset.loc}</td>
                  <td className="p-3"><span className={`${asset.statusColor} px-2 py-1 rounded-full text-xs font-bold`}>{asset.status}</span></td>
                  <td className="p-3 text-right"><div className="flex items-center justify-end"><span className="font-bold mr-2">{asset.util}%</span><div className="w-16 bg-slate-200 h-1.5 rounded-full">{asset.barColor && <div className={`${asset.barColor} h-1.5 rounded-full`} style={{ width: `${asset.util}%` }}></div>}</div></div></td>
                  <td className={`p-3 text-right ${asset.next === 'Overdue' ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>{asset.next}</td>
                  <td className="p-3 text-center"><div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => showNotification("Service Request created.", "success")} className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded transition-colors"><Wrench className="w-4 h-4" /></button><button onClick={() => showNotification("Loading Asset History Log...", "info")} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition-colors"><FileClock className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // === BUDGET TAB ===
  const renderBudget = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><Target className="w-5 h-5 mr-2 text-rose-500" /> Budget vs Actuals (Variance Analysis)</h3>
          <div className="flex space-x-2">
            <button onClick={() => showNotification('Opening Budget Reallocation Tool...', 'info')} className="flex items-center px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"><ArrowRightLeft className="w-3 h-3 mr-2" /> Reallocate Funds</button>
            <button onClick={() => showNotification('Downloading Variance Report (PDF)...', 'success')} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"><Download className="w-3 h-3 mr-2" /> Download Report</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Unit Performance</h4>
            {[
              { label: 'Unit 1 Revenue', perf: '+12% vs Target', actual: '89.6%', amount: '₹13.4 Cr', color: 'bg-emerald-500' },
              { label: 'Unit 2 Opex', perf: '+5% Over Budget', actual: '84%', amount: '₹4.2 Cr', color: 'bg-red-500' },
              { label: 'Unit 3 Marketing', perf: '-8% Under Budget', actual: '73.6%', amount: '₹85 L', color: 'bg-blue-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2"><span className="font-medium text-slate-700">{item.label}</span><span className={`font-bold ${item.color === 'bg-red-500' ? 'text-red-600' : 'text-emerald-600'}`}>{item.perf}</span></div>
                <div className="relative w-full h-8 bg-slate-100 rounded-full overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10" style={{ left: '80%' }}></div>
                  <div className={`absolute top-0 left-0 h-full ${item.color} rounded-l-full`} style={{ width: item.actual }}></div>
                  <div className="absolute top-0 left-2 h-full flex items-center text-xs text-white font-bold">{item.amount}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Monthly Burn Rate</h4>
              <div className="flex items-end space-x-2 h-32 bg-slate-50 p-3 rounded-lg border border-slate-200">
                {[
                  { m: 'Jan', v: 3.1 }, { m: 'Feb', v: 3.4 }, { m: 'Mar', v: 3.2 }, { m: 'Apr', v: 3.5 }, { m: 'May', v: 3.3 },
                  { m: 'Jun', v: 3.6 }, { m: 'Jul', v: 3.8 }, { m: 'Aug', v: 3.4 }, { m: 'Sep', v: 3.2 }, { m: 'Oct', v: 3.5 }
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                    <div className="absolute -top-5 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{item.v}Cr</div>
                    <div className={`w-full rounded-t ${item.v > 3.5 ? 'bg-red-400' : 'bg-blue-400'} hover:brightness-110 transition-colors`} style={{ height: `${(item.v / 4) * 100}%` }}></div>
                    <span className="text-[9px] text-slate-500 mt-1">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-bold text-amber-800 text-sm mb-2">Critical Variances</h4>
              <ul className="text-xs space-y-2 text-amber-900">
                <li className="flex items-start"><AlertTriangle className="w-3 h-3 mr-2 mt-0.5 text-amber-500" /><span>Pharmacy Procurement is <strong>18% over budget</strong> due to uncontrolled margin breach.</span></li>
                <li className="flex items-start"><AlertTriangle className="w-3 h-3 mr-2 mt-0.5 text-amber-500" /><span>Unit 6 Revenue is 19% below target, correlating with low bed occupancy (50%).</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // === IPO READINESS ===
  // const renderIPO = () => (
  //   <div className="space-y-6 animate-fade-in">
  //     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
  //       <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center"><LayoutGrid className="w-5 h-5 mr-2 text-blue-600" /> IPO Readiness & Data Room</h3>
  //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  //         <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-center"><p className="text-2xl font-bold text-blue-700">{Math.round((ipoChecklist.filter(i => i.completed).length / ipoChecklist.length) * 100)}%</p><p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mt-1">DRHP Readiness</p></div>
  //         <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-center"><p className="text-2xl font-bold text-blue-700">12/15</p><p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mt-1">Audit Queries Closed</p></div>
  //         <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-center"><p className="text-2xl font-bold text-blue-700">8</p><p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mt-1">Active Investors</p></div>
  //         <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-center"><p className="text-2xl font-bold text-blue-700">142</p><p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mt-1">Files in VDR</p></div>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  //         <div className="bg-white border border-slate-200 rounded-lg p-5">
  //           <h4 className="font-bold text-sm text-slate-700 mb-4">Road to Listing (Timeline)</h4>
  //           <div className="space-y-4 relative pl-4 border-l-2 border-slate-100">
  //             <div className="relative"><div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div><p className="text-xs text-slate-500">Q1 2025</p><p className="text-sm font-bold text-emerald-700">Financial Restatement</p></div>
  //             <div className="relative"><div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div><p className="text-xs text-slate-500">Q3 2025 (Current)</p><p className="text-sm font-bold text-blue-700">DRHP Drafting & Legal Due Diligence</p></div>
  //             <div className="relative"><div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-300 rounded-full border-2 border-white"></div><p className="text-xs text-slate-500">Q4 2025</p><p className="text-sm font-medium text-slate-600">SEBI Filing & Approval</p></div>
  //             <div className="relative"><div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-300 rounded-full border-2 border-white"></div><p className="text-xs text-slate-500">Q1 2026</p><p className="text-sm font-medium text-slate-600">Roadshow & Book Building</p></div>
  //           </div>
  //         </div>
  //         <div className="bg-white border border-slate-200 rounded-lg p-5">
  //           <h4 className="font-bold text-sm text-slate-700 mb-4">Governance & Compliance Checklist</h4>
  //           <div className="space-y-3">
  //             {ipoChecklist.map((item) => (
  //               <div key={item.id} onClick={() => toggleIpoItem(item.id)} className="flex items-center cursor-pointer group hover:bg-slate-50 p-2 rounded transition-colors select-none">
  //                 <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 transition-colors ${item.completed ? 'bg-emerald-100' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
  //                   {item.completed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-slate-400"></div>}
  //                 </div>
  //                 <span className={`text-sm transition-all ${item.completed ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-800 font-medium'}`}>{item.text}</span>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
  //         <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-sm text-slate-700 flex items-center"><Database className="w-4 h-4 mr-2 text-blue-600" /> Virtual Data Room (VDR) Activity</h4><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Live</span></div>
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
  //           <div><span className="text-slate-500 block text-xs mb-1">Top Active Investor</span><span className="font-bold text-slate-800 flex items-center"><Users className="w-3 h-3 mr-1 text-slate-400" /> BlackRock PE</span></div>
  //           <div><span className="text-slate-500 block text-xs mb-1">Most Viewed Doc</span><span className="font-bold text-slate-800 flex items-center"><FileText className="w-3 h-3 mr-1 text-slate-400" /> FY24 Cons. Financials.pdf</span></div>
  //           <div><span className="text-slate-500 block text-xs mb-1">Recent Upload</span><span className="font-bold text-slate-800 flex items-center"><Upload className="w-3 h-3 mr-1 text-slate-400" /> Litigation Summary Q3.xlsx</span></div>
  //         </div>
  //       </div>
  //       <div className="flex space-x-3">
  //         <button onClick={() => showNotification("Secure connection established to Virtual Data Room.", "success")} className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-colors shadow-lg shadow-blue-900/20"><Lock className="w-4 h-4 mr-2" /> Access Virtual Data Room</button>
  //         <button onClick={() => showNotification("Opening Draft Red Herring Prospectus (v4.2)...", "info")} className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"><FileText className="w-4 h-4 mr-2" /> View DRHP Draft</button>
  //       </div>
  //     </div>
  //   </div>
  // );

  // === VENDOR MANAGEMENT ===
  const renderVendor = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Vendor Risk Profile</h4>
          <div className="space-y-4">
            {[{ label: 'High Risk', count: '3 Vendors', color: 'bg-red-500', pct: '15%', badge: 'bg-red-100 text-red-700' }, { label: 'Medium Risk', count: '8 Vendors', color: 'bg-amber-500', pct: '35%', badge: 'bg-amber-100 text-amber-700' }, { label: 'Low Risk', count: '14 Vendors', color: 'bg-emerald-500', pct: '50%', badge: 'bg-emerald-100 text-emerald-700' }].map((r, i) => (
              <div key={i}>
                <div className="flex justify-between items-center"><span className="text-sm text-slate-600">{r.label}</span><span className={`${r.badge} px-2 py-1 rounded text-xs font-bold`}>{r.count}</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-1"><div className={`${r.color} h-2 rounded-full`} style={{ width: r.pct }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Spend Analysis (YTD)</h4>
          <div className="flex items-center justify-center h-32"><div className="text-center"><p className="text-3xl font-bold text-slate-900">₹12.4 Cr</p><p className="text-xs text-slate-400 mt-1">Total Procurement Spend</p></div></div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-slate-50 rounded"><span className="block text-slate-500">Pharmacy</span><span className="font-bold">45%</span></div>
            <div className="p-2 bg-slate-50 rounded"><span className="block text-slate-500">Med Equip</span><span className="font-bold">30%</span></div>
            <div className="p-2 bg-slate-50 rounded"><span className="block text-slate-500">Facility</span><span className="font-bold">15%</span></div>
            <div className="p-2 bg-slate-50 rounded"><span className="block text-slate-500">IT & Admin</span><span className="font-bold">10%</span></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Contract Alerts</h4>
          <ul className="space-y-3">
            <li className="flex items-start"><AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" /><div><span className="text-sm font-bold text-slate-700 block">Pharmacy Central Vendor</span><span className="text-xs text-slate-500">Expiring in 28 days - <span className="text-red-600 font-medium">Renewal Blocked</span></span></div></li>
            <li className="flex items-start"><Clock className="w-4 h-4 text-amber-500 mr-2 mt-0.5" /><div><span className="text-sm font-bold text-slate-700 block">BioWaste Mgmt Ltd</span><span className="text-xs text-slate-500">Expiring in 45 days - <span className="text-blue-600 font-medium">Negotiation</span></span></div></li>
            <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" /><div><span className="text-sm font-bold text-slate-700 block">TechSolutions IT</span><span className="text-xs text-slate-500">Renewed yesterday (1 yr)</span></div></li>
          </ul>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center"><ClipboardList className="w-5 h-5 mr-2 text-blue-600" /> Vendor Master List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Vendor Name</th><th className="p-3">Category</th><th className="p-3">Risk Level</th><th className="p-3">Compliance</th><th className="p-3">Score</th><th className="p-3">Expiry</th><th className="p-3 text-right">Spend (YTD)</th></tr></thead>
            <tbody>
              {[
                { name: 'Pharmacy Central Vendor', cat: 'Pharmacy', risk: 'High', riskColor: 'bg-red-100 text-red-700', comp: 'Failed Audit', compColor: 'text-red-600', Icon: X, score: '⭐⭐ (2.4)', expiry: '30 Days Left', expiryColor: 'text-red-600 font-bold', spend: '₹4.2 Cr' },
                { name: 'CleanCare Services', cat: 'Housekeeping', risk: 'Low', riskColor: 'bg-emerald-100 text-emerald-700', comp: 'Compliant', compColor: 'text-emerald-600', Icon: CheckCircle2, score: '⭐⭐⭐⭐ (4.2)', expiry: 'Oct 2026', expiryColor: 'text-slate-600', spend: '₹85 L' },
                { name: 'MedEquip Solutions', cat: 'Medical Equip', risk: 'Medium', riskColor: 'bg-amber-100 text-amber-700', comp: 'Pending Docs', compColor: 'text-amber-600', Icon: AlertCircle, score: '⭐⭐⭐ (3.5)', expiry: 'Mar 2026', expiryColor: 'text-slate-600', spend: '₹2.8 Cr' },
              ].map((v, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium">{v.name}</td>
                  <td className="p-3">{v.cat}</td>
                  <td className="p-3"><span className={`${v.riskColor} px-2 py-1 rounded text-xs font-bold`}>{v.risk}</span></td>
                  <td className={`p-3 ${v.compColor}`}><div className="flex items-center"><v.Icon className="w-3 h-3 mr-1" /> {v.comp}</div></td>
                  <td className="p-3"><span className="text-yellow-500">{v.score}</span></td>
                  <td className={`p-3 ${v.expiryColor}`}>{v.expiry}</td>
                  <td className="p-3 text-right font-mono">{v.spend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // === SYSTEM HEALTH ===
  const renderSystemHealth = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center"><Server className="w-5 h-5 mr-2 text-slate-600" /> System Health & Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">Overall Server Load</p>
            <div className="flex items-end space-x-2 h-16">{[40, 60, 45, 70, 55, 80, 65, 50, 45, 60].map((h, i) => (<div key={i} className="flex-1 bg-blue-400 rounded-t opacity-70" style={{ height: `${h}%` }}></div>))}</div>
            <p className="text-right text-xs font-mono text-blue-600 mt-2">Avg: 57%</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">API Error Rate (24h)</p>
            <div className="flex items-end space-x-2 h-16">{[2, 1, 0, 5, 20, 5, 2, 1, 0, 1].map((h, i) => (<div key={i} className={`flex-1 rounded-t ${h > 10 ? 'bg-red-500' : 'bg-emerald-400'} opacity-70`} style={{ height: `${h * 4}%`, minHeight: '2px' }}></div>))}</div>
            <p className="text-right text-xs font-mono text-slate-600 mt-2">Peak: 0.2% (14:00)</p>
          </div>
        </div>
        <div className="space-y-3">
          {[{ name: 'HIS Sync (Patient Data)', icon: Database, status: 'Operational', color: 'text-emerald-700', pulse: true }, { name: 'Tally Prime (Accounting)', icon: Briefcase, status: 'Operational', color: 'text-emerald-700', pulse: false }, { name: 'LIMS (Lab Data)', icon: Activity, status: 'Latency: 400ms', color: 'text-amber-700', pulse: false }].map((sys, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-white rounded border border-slate-200 shadow-sm">
              <span className="text-sm font-medium flex items-center text-slate-700"><sys.icon className="w-4 h-4 mr-3 text-slate-400" /> {sys.name}</span>
              <div className="flex items-center"><span className={`w-2 h-2 ${sys.color === 'text-emerald-700' ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full mr-2 ${sys.pulse ? 'animate-pulse' : ''}`}></span><span className={`text-xs ${sys.color} font-bold`}>{sys.status}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // === PATIENT EXPERIENCE ===
  const renderPatientExp = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center"><Smile className="w-5 h-5 mr-2 text-yellow-500" /> Patient Experience (NPS)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="text-center"><div className="text-5xl font-extrabold text-slate-900">72</div><p className="text-xs text-slate-500 uppercase mt-2 font-bold tracking-wide">Net Promoter Score</p></div>
            <div className="flex-1 space-y-3">
              <div><div className="flex justify-between text-xs text-slate-600"><span>Promoters (9-10)</span><span className="font-bold">75%</span></div><div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
              <div><div className="flex justify-between text-xs text-slate-600"><span>Passives (7-8)</span><span className="font-bold">13%</span></div><div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: '13%' }}></div></div></div>
              <div><div className="flex justify-between text-xs text-slate-600"><span>Detractors (0-6)</span><span className="font-bold">12%</span></div><div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div></div></div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Department NPS Leaderboard</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Oncology</span><span className="font-bold text-emerald-600">88</span></li>
              <li className="flex justify-between"><span>Cardiology</span><span className="font-bold text-emerald-600">82</span></li>
              <li className="flex justify-between"><span>Orthopaedics</span><span className="font-bold text-blue-600">76</span></li>
              <li className="flex justify-between text-red-600"><span>Emergency (ER)</span><span className="font-bold">54</span></li>
            </ul>
          </div>
        </div>
        <div><h4 className="font-bold text-sm text-slate-700 mb-3">Common Sentiment Tags</h4>
          <div className="flex flex-wrap gap-2">
            {[{ tag: 'Doctor Availability', color: 'bg-green-100 text-green-700 border-green-200' }, { tag: 'Nursing Care', color: 'bg-green-100 text-green-700 border-green-200' }, { tag: 'Cleanliness', color: 'bg-green-100 text-green-700 border-green-200' }, { tag: 'Billing Wait Time', color: 'bg-red-100 text-red-700 border-red-200' }, { tag: 'Pharmacy Queue', color: 'bg-red-100 text-red-700 border-red-200' }, { tag: 'Cafeteria Food', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }].map(t => (
              <span key={t.tag} className={`px-3 py-1 ${t.color} rounded-full text-xs font-medium border`}>{t.tag}</span>
            ))}
          </div>
        </div>
        <div className="mt-6 p-3 bg-slate-50 rounded border border-slate-200 flex items-start">
          <Clock className="w-4 h-4 text-slate-400 mr-2 mt-0.5" />
          <div><p className="text-xs font-bold text-slate-700">Avg. OPD Wait Time</p><p className="text-sm text-slate-900">18 Mins <span className="text-xs text-green-600">(-2m vs last month)</span></p></div>
        </div>
      </div>
    </div>
  );

  // === PAYOUTS TAB ===
  const renderPayouts = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div><h3 className="text-lg font-bold text-slate-900 flex items-center mb-1"><Stethoscope className="w-5 h-5 mr-2 text-blue-600" /> Automated Variable Pay Engine</h3><p className="text-xs text-slate-500">Replaces manual Excel compilation. Rules codified based on agreements.</p></div>
          <div className="flex space-x-2">
            <button onClick={() => showNotification('Downloading Payroll Statement (CSV)...', 'info')} className="flex items-center px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"><Download className="w-3 h-3 mr-2" /> Statement</button>
            <button onClick={() => showNotification('Payroll Run Initiated for 180 Doctors.', 'success')} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"><RefreshCw className="w-3 h-3 mr-2" /> Run Payroll</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg"><p className="text-xs text-blue-700 uppercase font-bold">Total Payout (Oct)</p><p className="text-2xl font-bold text-slate-900">₹45.2 L</p></div>
          <div className="p-4 bg-white border border-slate-200 rounded-lg"><p className="text-xs text-slate-500 uppercase font-bold">Doctors Processed</p><p className="text-2xl font-bold text-slate-700">18</p></div>
          <div className="p-4 bg-white border border-slate-200 rounded-lg"><p className="text-xs text-slate-500 uppercase font-bold">Pending Review</p><p className="text-2xl font-bold text-amber-500">3</p></div>
          <div className="p-4 bg-white border border-slate-200 rounded-lg"><p className="text-xs text-slate-500 uppercase font-bold">Dispute Rate</p><p className="text-2xl font-bold text-emerald-500">0%</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead><tr className="bg-slate-50 text-slate-500 text-xs border-b border-slate-200"><th className="p-3 font-medium">Doctor Name</th><th className="p-3 font-medium">Volume</th><th className="p-3 font-medium text-right">Payout</th><th className="p-3 font-medium text-center">Status</th><th className="p-3 font-medium text-center">Actions</th></tr></thead>
              <tbody className="text-xs">
                {flatDocList.map((doc, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{doc.name}<span className="block text-[10px] text-slate-400 font-normal">{doc.dept}</span></td>
                    <td className="p-3 text-slate-600">{doc.procedures} Proc / {doc.opd} OPD</td>
                    <td className="p-3 font-bold text-slate-900 text-right">₹{doc.payout} L</td>
                    <td className="p-3 text-center"><span className={`px-2 py-1 rounded text-[10px] font-bold ${doc.status === 'Ready' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{doc.status}</span></td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => showNotification(`Approved payout for ${doc.name}`, 'success')} className="text-emerald-600 hover:text-emerald-800"><CheckSquare className="w-4 h-4" /></button>
                        <button onClick={() => showNotification(`Opened detailed breakdown for ${doc.name}`, 'info')} className="text-slate-400 hover:text-slate-900"><FileText className="w-4 h-4" /></button>
                        <button onClick={() => showNotification(`Payout for ${doc.name} put on hold.`, 'warning')} className="text-red-400 hover:text-red-600"><Ban className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-xs mb-3 flex items-center"><History className="w-3 h-3 mr-2" /> Payout Trend (6 Mo)</h4>
              <div className="h-32 flex items-end space-x-2 pt-4">
                {[
                  { m: 'May', v: 38 }, { m: 'Jun', v: 40 }, { m: 'Jul', v: 41 }, 
                  { m: 'Aug', v: 39 }, { m: 'Sep', v: 44 }, { m: 'Oct', v: 45 }
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                    <div className="absolute -top-6 text-[10px] font-bold text-slate-600 opacity-100 transition-opacity">₹{item.v}L</div>
                    <div className="w-full bg-blue-400 rounded-t hover:bg-blue-500 transition-colors" style={{ height: `${(item.v / 50) * 100}%` }}></div>
                    <span className="text-[9px] text-slate-500 mt-1 font-medium">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-blue-100 rounded-lg p-4 bg-blue-50 text-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <h4 className="font-bold text-blue-900 text-sm">Rules Engine Active</h4>
              <p className="text-[10px] text-blue-700 mt-1">Audit trail enabled. Any manual override requires L2 approval.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // === AUDIT TAB ===
  const renderAudit = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><FileText className="w-5 h-5 mr-2 text-rose-600" /> Internal Financial Controls (IFC) Audit Trail</h3>
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors shadow-lg shadow-blue-600/20">
            <Upload className="w-4 h-4 mr-2" /> Upload Audit Docs
            <input type="file" className="hidden" onChange={(e) => { if (e.target.files && e.target.files.length > 0) { showNotification(`"${e.target.files[0].name}" uploaded. Linking to Financial Statements...`, 'success'); } }} />
          </label>
        </div>
        <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
          <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800 leading-relaxed"><strong>System Note:</strong> Uploaded documents are automatically indexed and cross-referenced with the General Ledger (GL).</p>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <div className="w-full">
              <h4 className="font-bold text-red-900 text-sm flex items-center">MATERIAL WEAKNESS DETECTED: Pharmacy Procurement<span className="ml-2 bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full border border-red-200">High Severity</span></h4>
              <p className="text-sm text-red-800 mt-1"><span className="font-bold">Deficiency:</span> Existing controls failed to prevent purchase margins exceeding the 7% cap, resulting in a <strong>material misstatement of ₹4.47L</strong>.</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button onClick={() => showNotification("Issue Trace: Procurement Module -> Vendor 'Pharmacy Central' -> Batch SAVA5005", "error")} className="flex items-center px-3 py-1.5 bg-white border border-red-200 text-red-700 text-xs font-bold rounded hover:bg-red-100 transition-colors shadow-sm"><Search className="w-3 h-3 mr-1.5" /> Trace Issue Source</button>
                <button onClick={() => showNotification("Opening Evidence: 'Invoice_SAVA5005_Scanned.pdf'", "info")} className="flex items-center px-3 py-1.5 bg-white border border-red-200 text-red-700 text-xs font-bold rounded hover:bg-red-100 transition-colors shadow-sm"><FileText className="w-3 h-3 mr-1.5" /> View Proof Document</button>
              </div>
            </div>
          </div>
          <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg flex items-start">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
            <div><h4 className="font-bold text-emerald-900 text-sm">Control Deficiency Resolved: Variable Pay Delays</h4><p className="text-sm text-emerald-800 mt-1"><span className="font-bold">Status:</span> <strong>Effective.</strong> Manual calculation replaced by Business Rules Engine. 100% match with HIS procedure data.</p></div>
          </div>
          <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg flex items-start">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
            <div><h4 className="font-bold text-emerald-900 text-sm">Significant Deficiency Closed: Clinical Billing (SOP)</h4><p className="text-sm text-emerald-800 mt-1"><span className="font-bold">Status:</span> <strong>Effective.</strong> Billing system now enforces SOP templates. Revenue breach risk mitigated.</p></div>
          </div>
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg flex items-start">
            <RefreshCw className="w-5 h-5 text-amber-600 mr-3 mt-0.5 animate-spin" />
            <div><h4 className="font-bold text-amber-900 text-sm">Ongoing Observation: IND AS Transition</h4><p className="text-sm text-amber-800 mt-1"><span className="font-bold">Status:</span> <strong>In Progress.</strong> Dual-ledger system active for IPO transition.</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  // === REPORTS TAB ===
  const renderReports = () => {
    const reportsList = [
      { id: 'pharmacy', title: 'Pharmacy Margin Audit', desc: 'Forensic analysis of pharmacy procurement, highlighting 7% cap breaches.', type: 'Internal Audit', date: 'Feb 1, 2026', status: 'Critical', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', author: 'System Auto-Gen' },
      { id: 'cashflow', title: 'Consolidated Cash Flow', desc: 'Monthly cash flow statement aligned with accounting standards.', type: 'Financial', date: 'Nov 01, 2025', status: 'Ready', icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', author: 'Finance Controller' },
      { id: 'payouts', title: 'Variable Pay Disbursal', desc: 'Automated calculation of doctor payouts based on procedure volume.', type: 'HR / Finance', date: 'Nov 02, 2025', status: 'Pending Approval', icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', author: 'HR Payroll' },
      { id: 'inventory', title: 'Inventory Aging Analysis', desc: 'Breakdown of slow-moving (90+ days) stock across all units.', type: 'Operations', date: 'Oct 28, 2025', status: 'Ready', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', author: 'Supply Chain Head' },
      { id: 'rcm', title: 'RCM Denial Report', desc: 'Root cause analysis of insurance claim denials with payer-wise breakdown.', type: 'Revenue', date: 'Oct 30, 2025', status: 'Review Needed', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', author: 'RCM Manager' },
      { id: 'tax', title: 'GST & TDS Liability', desc: 'Monthly tax liability computation and input tax credit reconciliation.', type: 'Taxation', date: 'Nov 01, 2025', status: 'Ready', icon: FileText, color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100', author: 'Tax Consultant' }
    ];

    if (selectedReport) {
      const activeReport = reportsList.find(r => r.id === selectedReport) || reportsList[0];
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={() => setSelectedReport(null)} className="flex items-center text-slate-500 hover:text-blue-600 mb-4 text-sm font-medium transition-colors"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Reports List</button>
          <div className="bg-white p-8 md:p-12 shadow-xl rounded-sm max-w-4xl mx-auto border border-slate-200 min-h-[800px]">
            <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{activeReport.title}</h1>
                <p className="text-slate-500 mt-2 text-sm uppercase tracking-wider font-semibold">Classification: {activeReport.type}</p>
                <p className="text-slate-500 mt-1 text-sm">Generated on {activeReport.date} | Author: {activeReport.author}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end text-slate-900 font-bold text-xl mb-1"><HeartPulse className="w-6 h-6 mr-2 text-blue-600" /> Project 10</div>
                <p className="text-xs text-slate-400">Financial Control Tower</p>
              </div>
            </div>
            {selectedReport === 'pharmacy' ? (
              <>
                <div className="mb-8 bg-slate-50 p-6 rounded border-l-4 border-blue-600">
                  <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">1. Executive Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><p className="text-slate-700 text-sm leading-relaxed mb-4">A forensic analysis reveals a significant breach in the agreed 7% margin cap. Total excess payout: <strong>₹4.47 Lakhs</strong>.</p></div>
                    <div className="bg-white p-4 rounded border border-slate-200 shadow-sm"><p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Total Financial Impact</p><p className="text-3xl font-bold text-red-600">₹4,47,230</p><p className="text-xs text-red-400 mt-1 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Unapproved Excess Payout</p></div>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">2. Key Violations (Sample Data)</h2>
                  <table className="w-full text-left border-collapse text-sm">
                    <thead><tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-300"><th className="p-3">Month</th><th className="p-3">Item Name</th><th className="p-3">Batch</th><th className="p-3 text-right">Margin %</th><th className="p-3 text-right">Excess Payout</th></tr></thead>
                    <tbody>{violations.slice(0, 6).map((v, i) => (<tr key={i} className="border-b border-slate-100"><td className="p-2 text-slate-600">{v.month}</td><td className="p-2 text-slate-900 font-medium">{v.item}</td><td className="p-2 text-slate-500 font-mono text-xs">{v.batch}</td><td className="p-2 text-right font-bold text-red-600">{v.margin}%</td><td className="p-2 text-right font-bold text-red-600">{v.excess}</td></tr>))}</tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded border border-slate-200"><h3 className="text-md font-bold text-slate-700 mb-2">Report Context</h3><p className="text-sm text-slate-600">Consolidated data from Unit 1 to Unit 7.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border border-slate-200 rounded text-center"><p className="text-xs text-slate-500 uppercase">Records Processed</p><p className="text-2xl font-bold text-slate-900">14,205</p></div>
                  <div className="p-4 border border-slate-200 rounded text-center"><p className="text-xs text-slate-500 uppercase">Exceptions Found</p><p className="text-2xl font-bold text-amber-600">23</p></div>
                  <div className="p-4 border border-slate-200 rounded text-center"><p className="text-xs text-slate-500 uppercase">Reconciliation Status</p><p className="text-2xl font-bold text-emerald-600">99.8%</p></div>
                </div>
                <div className="flex justify-center p-8"><p className="text-slate-400 italic text-sm">-- End of Preview --</p></div>
              </div>
            )}
            <div className="mt-12 flex justify-between items-center pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-400">Project 10 Financial Control Tower v2.1</p>
              <div className="flex space-x-4">
                <button onClick={() => window.print()} className="flex items-center text-slate-900 hover:text-blue-600 font-medium transition-colors"><Printer className="w-4 h-4 mr-2" /> Print Report</button>
                <button onClick={() => showNotification(`Downloading ${activeReport.title}.pdf...`, 'success')} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"><Download className="w-4 h-4 mr-2" /> Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">Available Reports</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50">Recent</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50">Saved</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportsList.map((report) => (
            <div key={report.id} className={`bg-white p-6 rounded-xl shadow-sm border ${report.border} hover:shadow-md transition-all group flex flex-col h-full`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${report.bg} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}><report.icon className={`w-6 h-6 ${report.color}`} /></div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${report.status === 'Critical' ? 'bg-red-100 text-red-700' : report.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{report.status}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{report.title}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-grow">{report.desc}</p>
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4"><span className="text-xs text-slate-400 font-medium">Updated: {report.date}</span><span className="text-xs text-slate-400 font-medium">{report.type}</span></div>
                <div className="flex space-x-2">
                  <button onClick={() => setSelectedReport(report.id)} className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"><Eye className="w-4 h-4 mr-2" /> View</button>
                  <button onClick={() => showNotification(`Downloading ${report.title}.csv...`, 'info')} className="flex items-center justify-center px-3 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded hover:bg-slate-50 transition-colors"><Download className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === MAIN RENDER ===
  if (currentView === 'details') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <AnimationStyles />
        <DetailsView onBack={() => setCurrentView('dashboard')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row text-slate-900">
      <AnimationStyles />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      <CapexModal isOpen={isCapexModalOpen} onClose={() => setIsCapexModalOpen(false)} />
      
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {renderSidebar()}
      
      <main className="flex-1 md:ml-64 w-full transition-all duration-300">
        {renderTopBar()}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {activeTab === 'mis' && renderMIS()}
          {activeTab === 'pharmacy' && renderPharmacy()}
          {activeTab === 'payouts' && renderPayouts()}
          {activeTab === 'audit' && renderAudit()}
          {activeTab === 'ivf' && renderIVF()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'metrics' && renderMetrics()}
          {activeTab === 'financial_stmts' && renderFinancialStmts()}
          {activeTab === 'rcm' && renderRCM()}
          {activeTab === 'inventory' && renderInventory()}
          {activeTab === 'doctor_portal' && renderDoctorPortal()}
          {activeTab === 'assets' && renderAssets()}
          {activeTab === 'budget' && renderBudget()}
          {/* {activeTab === 'ipo' && renderIPO()} */}
          {activeTab === 'vendor' && renderVendor()}
          {activeTab === 'system_health' && renderSystemHealth()}
          {activeTab === 'patient_exp' && renderPatientExp()}
        </div>
      </main>
    </div>
  );
};

export default App;