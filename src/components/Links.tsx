import React, { useState } from 'react';
import '../css/Links.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const LinkList = () => {
    const [links, setLinks] = useState([
        { id: 1, url: 'https://www.youtube.com/', name: 'Youtube' },
        { id: 2, url: 'https://www.indeed.com/', name: 'Indeed'},
        { id: 3, url: 'https://github.com/', name: 'Github'}
    ]);

 const [newLink, setNewLink] = useState({ url: '', name: '' });

 const handleAddLink = () => {
    const newId = links.length + 1;
    setLinks([...links, { id: newId, ...newLink }]);
    setNewLink({ url: '', name: '' });
 };

 const handleRemoveLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
 };

 return (
    <div className='linksCard'>

        <Tabs>
            <TabList>
            <Tab>Quick Links</Tab>
            <Tab>Add Link</Tab>
            </TabList>

            <TabPanel>
                <div className="listContainer">
                    <ul>
                        {links.map(link => (
                            <li key={link.id}>
                                <a className='externalLink' href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                <a className='deleteBtn' onClick={() => handleRemoveLink(link.id)}>DELETE</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </TabPanel>
            <TabPanel>
                <form className='addLink' onSubmit={(e) => { e.preventDefault(); handleAddLink(); }}>
                    <input className = 'linkInput' type="text" placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}/>
                    <input className = 'linkInput' type="text" placeholder="Name" value={newLink.name} onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}/>
                    <button type="submit">Add Link</button>
                </form>
            </TabPanel>
        </Tabs>
            
            
        </div>
 );
};

