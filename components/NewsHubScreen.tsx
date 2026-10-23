import React from 'react';
import { NewsArticle } from '../utils/types';

interface NewsHubScreenProps {
    news: NewsArticle[];
    onExit: () => void;
}

export const NewsHubScreen: React.FC<NewsHubScreenProps> = ({ news, onExit }) => {
    const latestNews = news?.[0];
    const olderNews = news?.slice(1);

    return (
        <div className="news-hub-screen">
            <div className="news-hub-content">
                <header className="news-hub-header">
                    <h1>News Hub</h1>
                    <button onClick={onExit} className="btn-exit">Return to Hub</button>
                </header>
                
                {latestNews ? (
                    <main className="news-layout">
                        <article className="latest-news-article">
                            <span className="article-date">{latestNews.date}</span>
                            <h2>{latestNews.headline}</h2>
                            <p>{latestNews.body}</p>
                        </article>
                        
                        {olderNews.length > 0 && (
                            <aside className="older-news-list">
                                <h3>More Stories</h3>
                                {olderNews.map(article => (
                                    <div key={article.id} className="older-news-item">
                                        <span className="article-date">{article.date}</span>
                                        <h4>{article.headline}</h4>
                                    </div>
                                ))}
                            </aside>
                        )}
                    </main>
                ) : (
                    <p className="no-news">No news yet. Play a match to start the season's stories!</p>
                )}
            </div>
        </div>
    );
};