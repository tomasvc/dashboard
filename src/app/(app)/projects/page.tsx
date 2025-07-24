'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Project = {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    deadline: string;
    progress: number;
    team: {
        name: string;
    };
    owner: {
        full_name: string;
        email: string;
    };
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
          const { data, error } = await supabase
            .from('projects')
            .select(`
              id,
              name,
              description,
              status,
              priority,
              deadline,
              progress,
              team:team_id ( name ),
              owner:owner_id ( full_name, email )
            `)
            .order('created_at', { ascending: false });
    
          if (error) console.error('Error loading projects:', error);
          else setProjects(data as unknown as Project[]);
    
          setLoading(false);
        };
    
        fetchProjects();
      }, []);

      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Projects</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded-md shadow-sm">
                <h2 className="font-semibold text-lg">{project.name}</h2>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p>Status: {project.status}</p>
                <p>Owner: {project.owner.full_name}</p>
                <p>Team: {project.team.name}</p>
                <p>Progress: {project.progress}%</p>
              </li>
            ))}
          </ul>
        </div>
      );
}