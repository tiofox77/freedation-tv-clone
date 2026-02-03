import { videos, fullVideos, thumbnails } from "./videos";

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  thumbnail: string;
  video: string;        // Full video for the player
  videoPreview: string; // 30-second clip for previews
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
    heroVideo: videos.elephantBet,
    projects: [
      {
        id: "dr1",
        title: "Showreel 2024",
        client: "Freedation",
        year: "2024",
        description: "Compilação anual dos melhores projetos realizados pela equipe.",
        thumbnail: thumbnails.elephantBet,
        video: fullVideos.elephantBet,
        videoPreview: videos.elephantBet,
      },
      {
        id: "dr2",
        title: "Highlights Cinematográficos",
        client: "Freedation",
        year: "2023",
        description: "Momentos marcantes das produções cinematográficas do ano.",
        thumbnail: thumbnails.baiDirecto,
        video: fullVideos.baiDirecto,
        videoPreview: videos.baiDirecto,
      },
      {
        id: "dr3",
        title: "Best Of Documentary",
        client: "Freedation",
        year: "2023",
        description: "Seleção especial dos documentários produzidos.",
        thumbnail: thumbnails.yolaSemedo,
        video: fullVideos.yolaSemedo,
        videoPreview: videos.yolaSemedo,
      },
    ],
  },
  {
    id: "2",
    slug: "corporativos",
    title: "Corporativos",
    subtitle: "Vídeos Institucionais",
    description: "Produções audiovisuais que traduzem a essência de marcas e empresas. Criamos narrativas que conectam organizações aos seus públicos de forma autêntica e impactante.",
    heroVideo: videos.baiDirecto,
    projects: [
      {
        id: "corp1",
        title: "BAI Directo",
        client: "BAI - Banco Angolano de Investimentos",
        year: "2024",
        description: "Vídeo institucional apresentando os serviços digitais do banco.",
        thumbnail: thumbnails.baiDirecto,
        video: fullVideos.baiDirecto,
        videoPreview: videos.baiDirecto,
      },
      {
        id: "corp2",
        title: "BDA Site Institucional",
        client: "BDA",
        year: "2023",
        description: "Apresentação institucional para plataforma digital.",
        thumbnail: thumbnails.bdaSite,
        video: fullVideos.bdaSite,
        videoPreview: videos.bdaSite,
      },
      {
        id: "corp3",
        title: "VIVA Seguros - Campanha Malas",
        client: "VIVA Seguros",
        year: "2024",
        description: "Vídeo corporativo para campanha de seguros de viagem.",
        thumbnail: thumbnails.vivaSeguros,
        video: fullVideos.vivaSeguros,
        videoPreview: videos.vivaSeguros,
      },
      {
        id: "corp4",
        title: "VIVA Seguros - Follow Up",
        client: "VIVA Seguros",
        year: "2024",
        description: "Continuação da campanha institucional de seguros.",
        thumbnail: thumbnails.vivaFollowUp,
        video: fullVideos.vivaFollowUp,
        videoPreview: videos.vivaFollowUp,
      },
    ],
  },
  {
    id: "3",
    slug: "publicidade",
    title: "Publicidade",
    subtitle: "Comerciais & Campanhas",
    description: "Criações publicitárias que capturam a atenção e geram resultados. Das grandes campanhas televisivas aos conteúdos digitais, transformamos mensagens em experiências memoráveis.",
    heroVideo: videos.bdaWhatsapp,
    projects: [
      {
        id: "pub1",
        title: "BDA WhatsApp Campaign",
        client: "BDA",
        year: "2024",
        description: "Comercial digital para campanha de WhatsApp Business.",
        thumbnail: thumbnails.bdaWhatsapp,
        video: fullVideos.bdaWhatsapp,
        videoPreview: videos.bdaWhatsapp,
      },
      {
        id: "pub2",
        title: "Elephant Bet - Gibele",
        client: "Elephant Bet",
        year: "2023",
        description: "Comercial de alta produção para casa de apostas.",
        thumbnail: thumbnails.elephantBet,
        video: fullVideos.elephantBet,
        videoPreview: videos.elephantBet,
      },
      {
        id: "pub3",
        title: "VIVA Seguros - Viagem",
        client: "VIVA Seguros",
        year: "2024",
        description: "Campanha publicitária para seguros de viagem.",
        thumbnail: thumbnails.vivaSeguros,
        video: fullVideos.vivaSeguros,
        videoPreview: videos.vivaSeguros,
      },
    ],
  },
  {
    id: "4",
    slug: "video-clips",
    title: "Video Clips",
    subtitle: "Música & Performance",
    description: "Visualizações artísticas que elevam a música a uma experiência completa. Trabalhamos com artistas para criar narrativas visuais únicas que complementam suas criações musicais.",
    heroVideo: videos.yolaSemedo,
    projects: [
      {
        id: "vc1",
        title: "Yola Semedo - Videoclipe",
        client: "Yola Semedo",
        year: "2024",
        description: "Produção cinematográfica para artista angolana.",
        thumbnail: thumbnails.yolaSemedo,
        video: fullVideos.yolaSemedo,
        videoPreview: videos.yolaSemedo,
      },
      {
        id: "vc2",
        title: "Performance Live",
        client: "Artista Confidencial",
        year: "2023",
        description: "Captação de performance ao vivo em estúdio.",
        thumbnail: thumbnails.baiDirecto,
        video: fullVideos.baiDirecto,
        videoPreview: videos.baiDirecto,
      },
    ],
  },
  {
    id: "5",
    slug: "making-off",
    title: "Making Off",
    subtitle: "Bastidores & Processo",
    description: "Um olhar exclusivo por trás das câmeras. Documentamos o processo criativo, os desafios e as histórias que acontecem durante as produções.",
    heroVideo: videos.makingOffElephant,
    projects: [
      {
        id: "mo1",
        title: "Making Off - Elephant Bet",
        client: "Elephant Bet",
        year: "2024",
        description: "Bastidores da produção do comercial Elephant Bet.",
        thumbnail: thumbnails.makingOffElephant,
        video: fullVideos.makingOffElephant,
        videoPreview: videos.makingOffElephant,
      },
      {
        id: "mo2",
        title: "BTS - Fraude Por Email",
        client: "Cliente Institucional",
        year: "2023",
        description: "Behind the scenes da campanha de conscientização.",
        thumbnail: thumbnails.btsFraudeEmail,
        video: fullVideos.btsFraudeEmail,
        videoPreview: videos.btsFraudeEmail,
      },
      {
        id: "mo3",
        title: "BTS - Fraude Por SMS",
        client: "Cliente Institucional",
        year: "2024",
        description: "Bastidores da produção sobre segurança digital.",
        thumbnail: thumbnails.btsFraudeSms,
        video: fullVideos.btsFraudeSms,
        videoPreview: videos.btsFraudeSms,
      },
    ],
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
