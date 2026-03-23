'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { 
  parseResume, getResumeHistory, getResumeById, deleteResume,
  analyzeJobFit, type ParsedResume, type ResumeHistoryItem 
} from '@/services/resumeService';
import { AlertCircle, Sparkles, Loader2 } from 'lucide-react';

// Components
import { JobFitReport } from '@/components/career-hub/resume-analyzer/JobFitReport';
import { UploadZone } from '@/components/career-hub/resume-analyzer/UploadZone';
import { ResumeDisplay } from '@/components/career-hub/resume-analyzer/ResumeDisplay';
import { HistoryList } from '@/components/career-hub/resume-analyzer/HistoryList';
import { JobFitCheck } from '@/components/career-hub/resume-analyzer/JobFitCheck';

// Types
import { JobFitAnalysisData } from './types';

export default function ResumeAnalyzerPage() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.push('/login');
  }, [router]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedResume | null>(null);
  const [fileName, setFileName] = useState('');
  const [history, setHistory] = useState<ResumeHistoryItem[]>([]);

  // Job Fit State
  const [jobUrl, setJobUrl] = useState('');
  const [jobFitData, setJobFitData] = useState<JobFitAnalysisData | null>(null);
  const [fitLoading, setFitLoading] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      setHistoryLoading(true);
      const data = await getResumeHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setParsed(null);
    setFileName(file.name);

    try {
      const result = await parseResume(file);
      setParsed(result.data);
      loadHistory(); // Refresh history
    } catch (err: any) {
      setError(err.message ?? 'Failed to parse resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadFromHistory = async (item: ResumeHistoryItem) => {
    setLoading(true);
    setError(null);
    setFileName(item.fileName);
    try {
      const data = await getResumeById(item.id);
      setParsed(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError('Failed to load analysis from history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this analysis?')) return;
    try {
      await deleteResume(id);
      setHistory(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      alert('Failed to delete.');
    }
  };

  const handleJobFit = async () => {
    if (!jobUrl) return;
    setFitLoading(true);
    setError(null);
    try {
      const data = await analyzeJobFit(jobUrl);
      setJobFitData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze job fit');
    } finally {
      setFitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className={`mx-auto px-4 sm:px-6 py-8 ${parsed || jobFitData ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {jobFitData ? (
          <JobFitReport data={jobFitData} onBack={() => setJobFitData(null)} />
        ) : (
          <>
            {/* Header / Hero */}
            {!parsed && !loading && (
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered · Professional · Instant
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Analyze Your Resume
                </h1>
                <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  Upload any CV or resume. Our AI reads it like a human recruiter and extracts every detail.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700 max-w-2xl mx-auto">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Action failed</p>
                  <p className="mt-0.5 text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* Core UI Sections */}
            {!parsed && (
              <UploadZone onFile={handleFile} loading={loading} />
            )}

            {!parsed && !loading && (
              <JobFitCheck 
                jobUrl={jobUrl} 
                setJobUrl={setJobUrl} 
                handleJobFit={handleJobFit} 
                fitLoading={fitLoading} 
                historyLength={history.length}
              />
            )}

            {!parsed && !loading && history.length > 0 && (
              <HistoryList 
                history={history} 
                onLoad={handleLoadFromHistory} 
                onDelete={handleDeleteHistory} 
              />
            )}

            {parsed && (
              <ResumeDisplay 
                data={parsed} 
                fileName={fileName} 
                onReset={() => { setParsed(null); setError(null); }} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
