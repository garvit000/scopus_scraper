export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  citations: number;
}

export interface Author {
  id: string;
  name: string;
  department: string;
  hIndex: number;
  totalCitations: number;
  documentsCount: number;
  scopusId: string;
  publications: Publication[];
  citationHistory: { year: number; count: number }[];
}

export const MOCK_AUTHORS: Author[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    hIndex: 42,
    totalCitations: 2840,
    documentsCount: 85,
    scopusId: "56789012345",
    citationHistory: [
      { year: 2018, count: 120 },
      { year: 2019, count: 180 },
      { year: 2020, count: 290 },
      { year: 2021, count: 380 },
      { year: 2022, count: 520 },
      { year: 2023, count: 650 },
      { year: 2024, count: 700 },
    ],
    publications: [
      {
        id: "p1",
        title: "Machine Learning Approaches in Bioinformatics: A Comprehensive Review",
        journal: "Nature Biotechnology",
        year: 2023,
        citations: 287,
      },
      {
        id: "p2",
        title: "Deep Neural Networks for Protein Structure Prediction",
        journal: "Science",
        year: 2022,
        citations: 342,
      },
      {
        id: "p3",
        title: "Advanced Algorithms for Genomic Data Analysis",
        journal: "Cell",
        year: 2021,
        citations: 198,
      },
    ],
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    department: "Biomedical Engineering",
    hIndex: 38,
    totalCitations: 2156,
    documentsCount: 72,
    scopusId: "67890123456",
    citationHistory: [
      { year: 2018, count: 95 },
      { year: 2019, count: 140 },
      { year: 2020, count: 225 },
      { year: 2021, count: 310 },
      { year: 2022, count: 420 },
      { year: 2023, count: 530 },
      { year: 2024, count: 436 },
    ],
    publications: [
      {
        id: "p4",
        title: "Biomedical Signal Processing Using Advanced Filtering Techniques",
        journal: "IEEE Transactions on Biomedical Engineering",
        year: 2023,
        citations: 156,
      },
      {
        id: "p5",
        title: "Novel Approaches to Medical Image Analysis",
        journal: "Medical Image Analysis",
        year: 2022,
        citations: 234,
      },
      {
        id: "p6",
        title: "Machine Learning in Healthcare: Current Trends and Future Directions",
        journal: "Nature Medicine",
        year: 2021,
        citations: 189,
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    department: "Materials Science",
    hIndex: 35,
    totalCitations: 1892,
    documentsCount: 68,
    scopusId: "78901234567",
    citationHistory: [
      { year: 2018, count: 80 },
      { year: 2019, count: 125 },
      { year: 2020, count: 190 },
      { year: 2021, count: 275 },
      { year: 2022, count: 365 },
      { year: 2023, count: 485 },
      { year: 2024, count: 372 },
    ],
    publications: [
      {
        id: "p7",
        title: "Nanomaterials for Energy Storage Applications",
        journal: "Advanced Materials",
        year: 2023,
        citations: 298,
      },
      {
        id: "p8",
        title: "Smart Materials and Their Applications in Modern Technology",
        journal: "Materials Today",
        year: 2022,
        citations: 176,
      },
      {
        id: "p9",
        title: "Sustainable Manufacturing of Advanced Composites",
        journal: "Composites Science and Technology",
        year: 2021,
        citations: 145,
      },
    ],
  },
  {
    id: "4",
    name: "Prof. David Thompson",
    department: "Physics",
    hIndex: 48,
    totalCitations: 3245,
    documentsCount: 92,
    scopusId: "89012345678",
    citationHistory: [
      { year: 2018, count: 150 },
      { year: 2019, count: 220 },
      { year: 2020, count: 340 },
      { year: 2021, count: 450 },
      { year: 2022, count: 580 },
      { year: 2023, count: 720 },
      { year: 2024, count: 785 },
    ],
    publications: [
      {
        id: "p10",
        title: "Quantum Computing Applications in Complex Systems",
        journal: "Nature Physics",
        year: 2023,
        citations: 412,
      },
      {
        id: "p11",
        title: "Advanced Theoretical Models in Quantum Mechanics",
        journal: "Physical Review Letters",
        year: 2022,
        citations: 356,
      },
      {
        id: "p12",
        title: "Experimental Validation of Quantum Entanglement Theories",
        journal: "Science",
        year: 2021,
        citations: 289,
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Lisa Wang",
    department: "Chemistry",
    hIndex: 31,
    totalCitations: 1654,
    documentsCount: 59,
    scopusId: "90123456789",
    citationHistory: [
      { year: 2018, count: 70 },
      { year: 2019, count: 110 },
      { year: 2020, count: 165 },
      { year: 2021, count: 235 },
      { year: 2022, count: 320 },
      { year: 2023, count: 425 },
      { year: 2024, count: 329 },
    ],
    publications: [
      {
        id: "p13",
        title: "Green Chemistry Approaches for Sustainable Synthesis",
        journal: "Green Chemistry",
        year: 2023,
        citations: 187,
      },
      {
        id: "p14",
        title: "Catalytic Processes in Environmental Applications",
        journal: "Environmental Science & Technology",
        year: 2022,
        citations: 213,
      },
      {
        id: "p15",
        title: "Novel Organic Synthesis Methods for Drug Discovery",
        journal: "Journal of Medicinal Chemistry",
        year: 2021,
        citations: 156,
      },
    ],
  },
  {
    id: "6",
    name: "Prof. Robert Kumar",
    department: "Electrical Engineering",
    hIndex: 44,
    totalCitations: 2987,
    documentsCount: 78,
    scopusId: "01234567890",
    citationHistory: [
      { year: 2018, count: 130 },
      { year: 2019, count: 195 },
      { year: 2020, count: 285 },
      { year: 2021, count: 390 },
      { year: 2022, count: 505 },
      { year: 2023, count: 642 },
      { year: 2024, count: 840 },
    ],
    publications: [
      {
        id: "p16",
        title: "5G Networks and Beyond: Future Wireless Technologies",
        journal: "IEEE Communications Magazine",
        year: 2023,
        citations: 324,
      },
      {
        id: "p17",
        title: "Internet of Things Security: Challenges and Solutions",
        journal: "IEEE Internet of Things Journal",
        year: 2022,
        citations: 267,
      },
      {
        id: "p18",
        title: "Machine Learning for Network Optimization",
        journal: "IEEE Transactions on Network and Service Management",
        year: 2021,
        citations: 198,
      },
    ],
  },
];

export const calculateOverallStats = () => {
  const totalAuthors = MOCK_AUTHORS.length;
  const totalCitations = MOCK_AUTHORS.reduce((sum, author) => sum + author.totalCitations, 0);
  const averageHIndex = Math.round(
    MOCK_AUTHORS.reduce((sum, author) => sum + author.hIndex, 0) / totalAuthors
  );
  const totalDocuments = MOCK_AUTHORS.reduce((sum, author) => sum + author.documentsCount, 0);

  return {
    totalAuthors,
    totalCitations,
    averageHIndex,
    totalDocuments,
  };
};