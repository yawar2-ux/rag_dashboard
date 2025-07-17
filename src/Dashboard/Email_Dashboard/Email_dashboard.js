import React, { useState, useEffect } from 'react';

function EmailDashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleBodyId, setVisibleBodyId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [UnreadOnly, setUnreadOnly] = useState(false);
  const [labelFilter, setLabelFilter] = useState('all');
  const [maxResults, setMaxResults] = useState(20);
  const [dateAfter, setDateAfter] = useState('');
  const [dateBefore, setDateBefore] = useState('');

  const toggleBody = (id) => {
    setVisibleBodyId(prevId => (prevId === id ? null : id));
  };

  const fetchEmails = async () => {
    setError('');
    setLoading(true);

    const queryParams = new URLSearchParams();// WILL DO MORE

    if (maxResults) queryParams.append('max_results', maxResults);
    if (dateAfter) queryParams.append('date_after', dateAfter);
    if (dateBefore) queryParams.append('date_before', dateBefore);
    if (searchTerm) queryParams.append('sender', searchTerm);
    if (UnreadOnly) queryParams.append('unread', true);
    if (labelFilter !== 'all') queryParams.append('label', labelFilter);
    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${baseURL}/Automated_email_response/api/fetch-emails?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch emails');
      const data = await response.json();
      setEmails(data.emails || []);
      console.log('Emails fetched:', data.emails);
    } catch (err) {
      setError('Failed to load emails. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);
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
              <div className="filter-input-group">
                <label htmlFor="maxResults" className="filter-label">Max Results</label>
                <input
                  type="number"
                  placeholder="Max Results"
                  value={maxResults}
                  onChange={(e) => setMaxResults(e.target.value)}
                  className="filter-input"
                />
              </div>
              <div className="filter-input-group">
                <label htmlFor="dateAfter" className="filter-label">Date After</label>
                <input
                  id="dateAfter"
                  type="date"
                  value={dateAfter}
                  onChange={(e) => setDateAfter(e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-input-group">
                <label htmlFor="dateBefore" className="filter-label">Date Before</label>
                <input
                  id="dateBefore"
                  type="date"
                  value={dateBefore}
                  onChange={(e) => setDateBefore(e.target.value)}
                  className="filter-input"
                />
              </div>


              <select
                value={UnreadOnly}
                onChange={(e) => setUnreadOnly(e.target.value === 'true')}
                className="filter-select"
              >
                <option value="false">All Emails</option>
                <option value="true">Unread Only</option>
              </select>

              <select
                value={labelFilter}
                onChange={(e) => setLabelFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Labels</option>
                <option value="inbox">Inbox</option>
                <option value="spam">Spam</option>
                <option value="important">Important</option>
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
          ) : emails.length > 0 ? (
            <div className="emails-wrapper">
              {emails.map((email, index) => (
                <div key={index} className={`email-item ${!email.unread ? 'email-unread' : ''}`}>
                  <div className="email-header">
                    <div className="email-avatar">
                      {email.sender?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="email-details">
                      <div className="email-sender-date">
                        <p className={`email-sender ${!email.unread ? 'email-sender-unread' : ''}`}>
                          {email.sender || 'Unknown Sender'}
                        </p>
                        <p className="email-date">
                          {email.email_received_at ? formatDate(email.email_received_at) : 'No date'}
                        </p>
                      </div>
                      <h3 className={`email-subject ${!email.unread ? 'email-subject-unread' : ''}`}>
                        {email.subject || 'No Subject'}
                      </h3>
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
                            <span key={idx} className={`email-label ${getLabelColor(label)}`}>
                              {label}
                            </span>
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

          {!loading && emails.length > 0 && (
            <div className="footer">
              <div className="footer-info">
                <span>Showing {emails.length} emails</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailDashboard;
