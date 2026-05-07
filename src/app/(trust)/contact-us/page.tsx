export default function ContactUsPage() {
  return (
    <div className="max-w-2xl mx-auto py-24 space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold font-heading text-white tracking-tight">Contact Us</h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Reach out to our archival team for API access, C2PA verification inquiries, or to submit a historically significant prompt to the database.
        </p>
      </div>
      
      <form className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-mono text-gray-400">Archivist Designation (Name)</label>
          <input 
            type="text" 
            id="name"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all" 
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-mono text-gray-400">Transmission Vector (Email)</label>
          <input 
            type="email" 
            id="email"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all" 
            placeholder="john@research.edu"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-mono text-gray-400">Transmission Payload</label>
          <textarea 
            id="message"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all h-40 resize-none" 
            placeholder="Describe your inquiry or artifact submission..."
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_-5px_rgba(217,70,239,0.5)]"
        >
          Initialize Transmission
        </button>
      </form>
    </div>
  );
}
