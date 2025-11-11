import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '../ui/button.jsx';
import Input from '../ui/input.jsx';
import Textarea from '../ui/textarea.jsx';
import {
  fetchOverview,
  fetchAnalytics,
  fetchUsers,
  fetchLogs,
  fetchDomains,
  createDomain,
  deleteDomain,
  fetchSecurity,
  updateSecurity,
  fetchSettings,
  updateSettings
} from '../../services/adminService.js';

const operationsTabs = ['Overview', 'Analytics', 'Users', 'Logs', 'Domains', 'Security', 'Settings'];

const AdminOpsPanel = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [domainForm, setDomainForm] = useState({ domain: '', status: 'Connected', sslStatus: 'Active' });
  const [settingsForm, setSettingsForm] = useState({ orgName: '', supportEmail: '', notes: '' });
  const queryClient = useQueryClient();

  const overviewQuery = useQuery({ queryKey: ['admin', 'overview'], queryFn: fetchOverview });
  const analyticsQuery = useQuery({ queryKey: ['admin', 'analytics'], queryFn: fetchAnalytics });
  const usersQuery = useQuery({ queryKey: ['admin', 'users'], queryFn: fetchUsers });
  const logsQuery = useQuery({ queryKey: ['admin', 'logs'], queryFn: fetchLogs });
  const domainsQuery = useQuery({ queryKey: ['admin', 'domains'], queryFn: fetchDomains });
  const securityQuery = useQuery({ queryKey: ['admin', 'security'], queryFn: fetchSecurity });
  const settingsQuery = useQuery({ queryKey: ['admin', 'settings'], queryFn: fetchSettings });

  useEffect(() => {
    if (settingsQuery.data) {
      setSettingsForm({
        orgName: settingsQuery.data.orgName || '',
        supportEmail: settingsQuery.data.supportEmail || '',
        notes: settingsQuery.data.notes || ''
      });
    }
  }, [settingsQuery.data]);

  const createDomainMutation = useMutation({
    mutationFn: createDomain,
    onSuccess: () => {
      setDomainForm({ domain: '', status: 'Connected', sslStatus: 'Active' });
      queryClient.invalidateQueries(['admin', 'domains']);
    }
  });

  const deleteDomainMutation = useMutation({
    mutationFn: deleteDomain,
    onSuccess: () => queryClient.invalidateQueries(['admin', 'domains'])
  });

  const securityMutation = useMutation({
    mutationFn: updateSecurity,
    onSuccess: () => queryClient.invalidateQueries(['admin', 'security'])
  });

  const settingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => queryClient.invalidateQueries(['admin', 'settings'])
  });

  const overviewCards = useMemo(() => {
    const data = overviewQuery.data;
    if (!data) return [];
    const filledSections = data.sections?.filter((section) => section.count > 0).length || 0;
    const busiestSection = data.sections?.reduce(
      (prev, current) => (current.count > (prev?.count || 0) ? current : prev),
      null
    );
    return [
      { label: 'Total Entries', value: data.totalEntries || 0, footer: `${filledSections} sections populated` },
      {
        label: 'Last Update',
        value: data.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : 'Never',
        footer: data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : ''
      },
      {
        label: 'Busiest Section',
        value: busiestSection?.section || '—',
        footer: busiestSection ? `${busiestSection.count} entries` : 'No data'
      }
    ];
  }, [overviewQuery.data]);

  const handleDomainSubmit = (event) => {
    event.preventDefault();
    if (!domainForm.domain.trim()) return;
    createDomainMutation.mutate(domainForm);
  };

  const handleSecurityToggle = (key) => {
    if (!securityQuery.data) return;
    const payload = { [key]: !securityQuery.data[key] };
    securityMutation.mutate(payload);
  };

  const handleSettingsSubmit = (event) => {
    event.preventDefault();
    settingsMutation.mutate(settingsForm);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        if (overviewQuery.isLoading) return <p className="text-sm text-white/60">Loading metrics…</p>;
        return (
          <div className="grid gap-4 lg:grid-cols-3">
            {overviewCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
                <p className="text-sm text-white/60">{card.footer}</p>
              </div>
            ))}
          </div>
        );
      case 'Analytics':
        if (analyticsQuery.isLoading) return <p className="text-sm text-white/60">Loading analytics…</p>;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Section distribution</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {(analyticsQuery.data || []).map((row) => (
                <li key={row.section} className="flex items-center justify-between">
                  <span className="capitalize">{row.section}</span>
                  <span>{row.count} entries ({row.percentage}%)</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Users':
        if (usersQuery.isLoading) return <p className="text-sm text-white/60">Loading team…</p>;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-white">Team directory</h3>
              <Button variant="secondary" className="border border-white/20 bg-transparent">Invite User</Button>
            </div>
            <ul className="mt-4 space-y-3">
              {(usersQuery.data || []).map((user) => (
                <li key={user.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{user.fullName}</span>
                    <span className="text-xs uppercase tracking-wide text-white/50">{user.role}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-white/50">
                    <span>{user.email}</span>
                    <span>Updated {new Date(user.updatedAt || user.createdAt).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Logs':
        if (logsQuery.isLoading) return <p className="text-sm text-white/60">Loading activity…</p>;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Activity log</h3>
              <Button variant="secondary" className="border border-white/20 bg-transparent">Download</Button>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {(logsQuery.data || []).map((entry) => (
                <li key={entry.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{entry.title || 'Untitled'} · {entry.section}</p>
                    <p className="text-xs text-white/50">{entry.createdBy || 'system'}</p>
                  </div>
                  <span className="text-xs text-white/50">{new Date(entry.updatedAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Domains':
        if (domainsQuery.isLoading) return <p className="text-sm text-white/60">Loading domains…</p>;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Connected domains</h3>
            </div>
            <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleDomainSubmit}>
              <Input
                placeholder="domain"
                value={domainForm.domain}
                onChange={(event) => setDomainForm((prev) => ({ ...prev, domain: event.target.value }))}
                className="bg-white/10 text-white placeholder:text-white/60"
              />
              <Input
                placeholder="status"
                value={domainForm.status}
                onChange={(event) => setDomainForm((prev) => ({ ...prev, status: event.target.value }))}
                className="bg-white/10 text-white placeholder:text-white/60"
              />
              <Input
                placeholder="SSL status"
                value={domainForm.sslStatus}
                onChange={(event) => setDomainForm((prev) => ({ ...prev, sslStatus: event.target.value }))}
                className="bg-white/10 text-white placeholder:text-white/60"
              />
              <Button type="submit" disabled={createDomainMutation.isLoading || !domainForm.domain.trim()}>
                Add
              </Button>
            </form>
            <table className="w-full text-left text-sm text-white/80">
              <thead>
                <tr>
                  <th className="py-2 text-white/60">Domain</th>
                  <th className="py-2 text-white/60">Status</th>
                  <th className="py-2 text-white/60">SSL</th>
                  <th className="py-2 text-white/60" />
                </tr>
              </thead>
              <tbody>
                {(domainsQuery.data || []).map((domain) => (
                  <tr key={domain.id} className="border-t border-white/5">
                    <td className="py-3">{domain.domain}</td>
                    <td className="py-3">{domain.status}</td>
                    <td className="py-3">{domain.sslStatus}</td>
                    <td className="py-3 text-right">
                      <Button
                        type="button"
                        variant="secondary"
                        className="border border-white/20 bg-transparent text-xs"
                        onClick={() => deleteDomainMutation.mutate(domain.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Security':
        if (securityQuery.isLoading) return <p className="text-sm text-white/60">Loading security…</p>;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Security controls</h3>
            <div className="mt-4 space-y-4">
              {['mfaEnabled', 'alertsEnabled', 'autoLogout'].map((key) => (
                <div key={key} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-xs text-white/50">{securityQuery.data?.[key] ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSecurityToggle(key)}
                    className={`relative h-6 w-11 rounded-full transition ${securityQuery.data?.[key] ? 'bg-primary-500' : 'bg-white/20'}`}
                    disabled={securityMutation.isLoading}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                        securityQuery.data?.[key] ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Settings':
        if (settingsQuery.isLoading) return <p className="text-sm text-white/60">Loading settings…</p>;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Instance settings</h3>
            <form className="mt-4 space-y-4" onSubmit={handleSettingsSubmit}>
              <Input
                placeholder="Organization name"
                value={settingsForm.orgName}
                onChange={(event) => setSettingsForm((prev) => ({ ...prev, orgName: event.target.value }))}
                className="bg-white/10 text-white"
              />
              <Input
                placeholder="Support email"
                value={settingsForm.supportEmail}
                onChange={(event) => setSettingsForm((prev) => ({ ...prev, supportEmail: event.target.value }))}
                className="bg-white/10 text-white"
              />
              <Textarea
                rows="3"
                placeholder="Internal notes"
                value={settingsForm.notes}
                onChange={(event) => setSettingsForm((prev) => ({ ...prev, notes: event.target.value }))}
                className="bg-white/10 text-white"
              />
              <Button type="submit" disabled={settingsMutation.isLoading}>
                Save Settings
              </Button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl bg-white/5 p-6">
      <div className="flex flex-wrap gap-3">
        {operationsTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab ? 'bg-white text-neutral-900' : 'bg-white/10 text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-6 text-white">{renderContent()}</div>
    </div>
  );
};

export default AdminOpsPanel;
