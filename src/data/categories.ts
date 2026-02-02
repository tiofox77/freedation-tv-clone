import video1 from "@/assets/video-1.mp4";
import video2 from "@/assets/video-2.mp4";
import video3 from "@/assets/video-3.mp4";
import video4 from "@/assets/video-4.mp4";
import video5 from "@/assets/video-5.mp4";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";
import slide4 from "@/assets/slide-4.jpg";
import slide5 from "@/assets/slide-5.jpg";

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  thumbnail: string;
  video: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroVideo: string;
  projects: Project[];
}

export const categories: Category[] = [
  {
    id: "1",
    slug: "demo-reel",
    title: "Demo Reel",
    subtitle: "Nossa Vitrine Criativa",
    description: "Compilação dos melhores momentos e projetos que definem nossa identidade visual e criativa. Uma jornada através das nossas produções mais impactantes.",
    heroVideo: video1,
    projects: [
      {
        id: "dr1",
        title: "Showreel 2024",
        client: "Freedation",
        year: "2024",
        description: "Compilação anual dos melhores projetos realizados pela equipe.",
        thumbnail: slide1,
        video: video1,
      },
      {
        id: "dr2",
        title: "Highlights Cinematográficos",
        client: "Freedation",
        year: "2023",
        description: "Momentos marcantes das produções cinematográficas do ano.",
        thumbnail: slide4,
        video: video4,
      },
      {
        id: "dr3",
        title: "Best Of Documentary",
        client: "Freedation",
        year: "2023",
        description: "Seleção especial dos documentários produzidos.",
        thumbnail: slide5,
        video: video5,
      },
    ],
  },
  {
    id: "2",
    slug: "corporativos",
    title: "Corporativos",
    subtitle: "Vídeos Institucionais",
    description: "Produções audiovisuais que traduzem a essência de marcas e empresas. Criamos narrativas que conectam organizações aos seus públicos de forma autêntica e impactante.",
    heroVideo: video2,
    projects: [
      {
        id: "corp1",
        title: "Relatório Anual Sonangol",
        client: "Sonangol",
        year: "2024",
        description: "Vídeo institucional apresentando os resultados anuais da empresa.",
        thumbnail: slide2,
        video: video2,
      },
      {
        id: "corp2",
        title: "Cultura Empresarial",
        client: "BAI - Banco Angolano de Investimentos",
        year: "2023",
        description: "Documentário sobre a cultura e valores organizacionais.",
        thumbnail: slide2,
        video: video2,
      },
      {
        id: "corp3",
        title: "Lançamento de Produto",
        client: "Unitel",
        year: "2024",
        description: "Vídeo de apresentação para novo produto tecnológico.",
        thumbnail: slide2,
        video: video2,
      },
      {
        id: "corp4",
        title: "Treinamento Corporativo",
        client: "TAAG",
        year: "2023",
        description: "Série de vídeos educacionais para colaboradores.",
        thumbnail: slide2,
        video: video2,
      },
    ],
  },
  {
    id: "3",
    slug: "publicidade",
    title: "Publicidade",
    subtitle: "Comerciais & Campanhas",
    description: "Criações publicitárias que capturam a atenção e geram resultados. Das grandes campanhas televisivas aos conteúdos digitais, transformamos mensagens em experiências memoráveis.",
    heroVideo: video3,
    projects: [
      {
        id: "pub1",
        title: "Campanha Verão",
        client: "Coca-Cola Angola",
        year: "2024",
        description: "Comercial de televisão para campanha de verão.",
        thumbnail: slide3,
        video: video3,
      },
      {
        id: "pub2",
        title: "Spot Rádio Visual",
        client: "Refriango",
        year: "2023",
        description: "Adaptação visual de campanha radiofônica.",
        thumbnail: slide3,
        video: video3,
      },
      {
        id: "pub3",
        title: "Digital First Campaign",
        client: "Africell",
        year: "2024",
        description: "Série de vídeos otimizados para redes sociais.",
        thumbnail: slide3,
        video: video3,
      },
    ],
  },
  {
    id: "4",
    slug: "video-clips",
    title: "Video Clips",
    subtitle: "Música & Performance",
    description: "Visualizações artísticas que elevam a música a uma experiência completa. Trabalhamos com artistas para criar narrativas visuais únicas que complementam suas criações musicais.",
    heroVideo: video4,
    projects: [
      {
        id: "vc1",
        title: "Kuami - Novo Dia",
        client: "Kuami",
        year: "2024",
        description: "Videoclipe para single de afrobeats.",
        thumbnail: slide4,
        video: video4,
      },
      {
        id: "vc2",
        title: "Matias Damásio - Saudade",
        client: "Matias Damásio",
        year: "2023",
        description: "Produção cinematográfica para balada romântica.",
        thumbnail: slide4,
        video: video4,
      },
      {
        id: "vc3",
        title: "Yola Semedo - Força",
        client: "Yola Semedo",
        year: "2024",
        description: "Videoclipe narrativo com temática empoderamento.",
        thumbnail: slide4,
        video: video4,
      },
      {
        id: "vc4",
        title: "C4 Pedro - Celebração",
        client: "C4 Pedro",
        year: "2023",
        description: "Produção de alta energia para hit de kizomba.",
        thumbnail: slide4,
        video: video4,
      },
    ],
  },
  {
    id: "5",
    slug: "making-off",
    title: "Making Off",
    subtitle: "Bastidores & Processo",
    description: "Um olhar exclusivo por trás das câmeras. Documentamos o processo criativo, os desafios e as histórias que acontecem durante as produções.",
    heroVideo: video5,
    projects: [
      {
        id: "mo1",
        title: "Bastidores - Campanha Nacional",
        client: "Ministério da Cultura",
        year: "2024",
        description: "Documentário sobre a produção da campanha cultural.",
        thumbnail: slide5,
        video: video5,
      },
      {
        id: "mo2",
        title: "Behind The Scenes - Videoclipe",
        client: "Artista Confidencial",
        year: "2023",
        description: "Making of de produção musical internacional.",
        thumbnail: slide5,
        video: video5,
      },
      {
        id: "mo3",
        title: "O Processo Criativo",
        client: "Freedation",
        year: "2024",
        description: "Mini-documentário sobre nossa metodologia de trabalho.",
        thumbnail: slide5,
        video: video5,
      },
    ],
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
