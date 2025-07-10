import react from 'react';

import React, { useState, useEffect } from 'react';

function EmailDashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleBodyId, setVisibleBodyId] = useState(null);
  const toggleBody = (id) => {
    setVisibleBodyId(prevId => (prevId === id ? null : id));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [UnreadOnly, setUnreadOnly] = useState('false');
  const [labelFilter, setLabelFilter] = useState('all');
  const [maxResults, setMaxResults] = useState('');
  const [dateAfter, setDateAfter] = useState('');
  const [dateBefore, setDateBefore] = useState('');

  const fetchEmails = async () => {
    setError('');
    setLoading(true);

    const queryParams = new URLSearchParams();

    if (maxResults) queryParams.append('max_results', maxResults);
    if (dateAfter) queryParams.append('date_after', dateAfter);
    if (dateBefore) queryParams.append('date_before', dateBefore);

    try {
      const response = await fetch(`http://127.0.0.1:8000/rag_doc/Automated_email_response/api/fetch-emails?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch emails');
      const data = await response.json();
      setEmails(data.emails || []);
    } catch (err) {
      setError('Failed to load emails. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter(email => {
    const matchesSearch =
      email.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.body?.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesUnread =
      UnreadOnly === 'false' ||
      (UnreadOnly === 'true' && email.labels?.includes('UNREAD'));
  
    const matchesLabel =
      labelFilter === 'all' ||
      (email.labels && email.labels.includes(labelFilter.toUpperCase()));
  
    return matchesSearch && matchesUnread && matchesLabel;
  });

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getLabelColor = (label) => {
    const colors = {
      'UNREAD': 'label-unread',
      'INBOX': 'label-inbox',
      'SPAM': 'label-spam',
      'IMPORTANT': 'label-important',
      'STARRED': 'label-starred',
      'CATEGORY_UPDATES': 'label-category'
    };
    return colors[label] || 'label-inbox';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        <div className="header">
          <h1 className="header-title">Email Inbox</h1>

          <div className="filter-bar">
            <div className="search-box">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search emails..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search-icon">🔍</div>
              </div>
            </div>

            <div className="filters">
              <input type="number" placeholder="Max Results" value={maxResults} onChange={(e) => setMaxResults(e.target.value)} className="filter-input" />
              <input type="date" value={dateAfter} onChange={(e) => setDateAfter(e.target.value)} className="filter-input" />
              <input type="date" value={dateBefore} onChange={(e) => setDateBefore(e.target.value)} className="filter-input" />

              <select value={UnreadOnly} onChange={(e) => setUnreadOnly(e.target.value)} className="filter-select">
                <option value="false">All Emails</option>
                <option value="true">Unread Only</option>
              </select>

              <select value={labelFilter} onChange={(e) => setLabelFilter(e.target.value)} className="filter-select">
                <option value="all">All Labels</option>
                <option value="inbox">Inbox</option>
                <option value="spam">Spam</option>
                <option value="important">Important</option>
                <option value="starred">Starred</option>
              </select>

              <button onClick={fetchEmails} className="btn-refresh">Execute</button>
            </div>
          </div>
        </div>

        <div className="email-list">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading emails...</p>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : filteredEmails.length > 0 ? (
            <div className="emails-wrapper">
              {filteredEmails.map((email, index) => (
                <div key={index} className={`email-item ${!email.read ? 'email-unread' : ''}`}>
                  <div className="email-header">
                    <div className="email-avatar">{email.sender?.charAt(0).toUpperCase() || '?'}</div>
                    <div className="email-details">
                      <div className="email-sender-date">
                        <p className={`email-sender ${!email.read ? 'email-sender-unread' : ''}`}>{email.sender || 'Unknown Sender'}</p>
                        <p className="email-date">{email.email_received_at ? formatDate(email.email_received_at) : 'No date'}</p>
                      </div>
                      <h3 className={`email-subject ${!email.read ? 'email-subject-unread' : ''}`}>{email.subject || 'No Subject'}</h3>
                      <p className="email-id">Email ID: {email.id}</p>
                      <p className="thread-id">Thread ID: {email.thread_id}</p>
                      <button className="btn-see-body" onClick={() => toggleBody(email.id)}>
                        {visibleBodyId === email.id ? 'Hide Body' : 'See Body'}
                      </button>
                      {visibleBodyId === email.id && (
                        <pre className="email-body">{email.body || 'No content'}</pre>
                      )}
                      {email.labels && email.labels.length > 0 && (
                        <div className="email-labels">
                          {email.labels.map((label, idx) => (
                            <span key={idx} className={`email-label ${getLabelColor(label)}`}>{label}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-emails">No emails found matching your criteria.</div>
          )}

          {!loading && filteredEmails.length > 0 && (
            <div className="footer">
              <div className="footer-info">
                <span>Showing {filteredEmails.length} of {emails.length} emails</span>
                <button onClick={fetchEmails} className="footer-refresh">🔄 Refresh</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default EmailDashboard; 