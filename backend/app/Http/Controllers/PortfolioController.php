<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller
{
    public function index()
    {
        return response()->json([
            'profile' => [
                'name' => 'SORO Lamoussa',
                'title' => 'Data Scientist / Développeur IA',
                'location' => 'Abidjan',
                'phone' => '+225 0153898969',
                'email' => 'sorolamoussa1212@gmail.com',
                'github' => 'https://github.com/soro-gif',
                'linkedin' => 'https://www.linkedin.com/in/lamoussa-soro-629055144',
                'summary' => 'Data Scientist & Spécialiste GenAI, avec 4 ans d’expérience en gestion de base de données et supervision qualité pour l’ONG IDEAL INTER, combinée à une expertise en développement web (Laravel, React.js).',
            ],
            'skills' => $this->skills()->getData(true),
            'experiences' => $this->experiences()->getData(true),
            'projects' => $this->projects()->getData(true),
        ]);
    }

    public function projects()
    {
        return response()->json([
            [
                'title' => 'Projet de fin d’études - Bootcamp Generative AI & Machine Learning',
                'category' => 'IA générative',
                'description' => 'Conception et développement d’une solution d’IA générative capable de produire des résumés et interprétations de projets de loi adaptés à différents publics.',
                'technologies' => ['Python', 'Generative AI', 'Machine Learning', 'NLP', 'LLM', 'Prompt Engineering'],
                'link' => 'https://github.com/soro-gif',
                'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
            ],
            [
                'title' => 'NeuroCodeurs',
                'category' => 'Hackathon IA',
                'description' => 'Système intelligent de génération de contenu personnalisé basé sur l’intelligence artificielle.',
                'technologies' => ['Python', 'Generative AI', 'Machine Learning', 'Data Analysis', 'Data Visualization', 'EDA', 'Git', 'GitHub'],
                'link' => 'https://github.com/soro-gif',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
            ],
            [
                'title' => 'Site e-commerce de vente de vêtements',
                'category' => 'Laravel / E-commerce',
                'description' => 'Conception et développement d’un site e-commerce de vente de vêtements avec Laravel.',
                'technologies' => ['Laravel', 'Blade', 'JavaScript', 'Bootstrap CSS', 'PHP', 'MySQL'],
                'link' => 'https://github.com/soro-gif',
                'image' => 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
            ],
            [
                'title' => 'Application de gestion de garage',
                'category' => 'Gestion d’entreprise',
                'description' => 'Application web de gestion de garage et de véhicules avec Laravel.',
                'technologies' => ['Laravel', 'Blade', 'PHP', 'MySQL', 'HTML/CSS'],
                'link' => 'https://github.com/soro-gif',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
            ],
        ]);
    }

    public function experiences()
    {
        return response()->json([
            [
                'role' => 'Gestionnaire de Base de Données & Superviseur',
                'company' => 'ONG IDEAL INTER',
                'location' => 'Korhogo',
                'period' => '2021 - 2025',
                'description' => 'Gestion, saisie, contrôle et analyse des données de plus de 3 000 bénéficiaires dans la base de données PNOEV.',
            ],
            [
                'role' => 'Développeur Web',
                'company' => 'ONG IDEAL INTER',
                'location' => 'Korhogo',
                'period' => '2021 – 2025',
                'description' => 'Conception et mise en ligne du site web institutionnel avec WordPress et gestion des contenus.',
            ],
            [
                'role' => 'Développement d’un système IoT de surveillance environnementale',
                'company' => 'Projet de Master',
                'location' => 'Korhogo',
                'period' => '2025 - 2026',
                'description' => 'Conception d’un système IoT de surveillance environnementale basé sur ESP32.',
            ],
        ]);
    }

    public function skills()
    {
        return response()->json([
            'Langages' => ['Python', 'JavaScript', 'PHP', 'HTML5', 'CSS3', 'SQL'],
            'AI & ML' => ['Machine Learning', 'Deep Learning', 'NLP', 'IA générative', 'Prompt Engineering', 'RAG', 'LLM', 'Scikit-learn', 'TensorFlow'],
            'Web' => ['React.js', 'Laravel', 'Blade', 'Bootstrap CSS'],
            'Data' => ['MySQL', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook'],
            'IoT' => ['ESP32', 'Arduino'],
            'Outils' => ['Git', 'GitHub', 'Postman', 'Selenium IDE', 'Ollama', 'Hugging Face', 'ChatGPT', 'Claude Code', 'Gemini'],
        ]);
    }

    public function contact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:120',
            'email' => 'required|email',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            \Illuminate\Support\Facades\Mail::to('sorolamoussa1212@gmail.com')->send(new \App\Mail\ContactMessage($request->all()));
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'errors' => ['server' => ['Impossible d\'envoyer l\'email pour le moment. Veuillez réessayer plus tard.']]
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Votre message a bien été transmis. Je vous répondrai très rapidement.',
        ]);
    }
}
