import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formData } = req.body;

    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const response = await notion.pages.create({
        parent: {
          database_id: '36b608f57e944d65b2d637fccd9b08a5',
        },
        properties: {
          'Produto': {
            multi_select: [
              {
                name: 'Mentoria',
              },
            ],
          },
          'Name': {
            title: [
              {
                text: {
                  content: formData.name,
                },
              },
            ],
          },
          'Email': {
            rich_text: [
              {
                text: {
                  content: formData.email,
                },
              },
            ],
          },
          'Celular': {
            phone_number: formData.phone,
          },
          'Aonde você fez ou está fazendo Medicina?': {
            rich_text: [
              {
                text: {
                  content: formData.medSchool,
                },
              },
            ],
          },
          'Qual o status da sua graduação?': {
            select: {
              name: formData.gradStatus,
            },
          },
          'Qual especialidade você está priorizando?': {
            rich_text: [
              {
                text: {
                  content: formData.prioritySpecialty,
                },
              },
            ],
          },
          'Quando você começou a estudar para residência?': {
            select: {
              name: formData.studyPlanning,
            },
          },
          'Qual(is) instituição(ões) vocês está priorizando para a sua residência médica?': {
            rich_text: [
              {
                text: {
                  content: formData.priorityInstitution,
                },
              },
            ],
          },
          'Quais são suas maiores dificuldades e/ou dúvidas para se preparar para a prova de residência?': {
            rich_text: [
              {
                text: {
                  content: formData.difficulties,
                },
              },
            ],
          },
          'Compra em': {
            date: {
              start: currentDate,
            },
          },
          'Canal de aquisição': {
            rich_text: [
              {
                text: {
                  content: formData.discoverySource,
                },
              },
            ],
          },
        },
      });

      res.status(200).json(response);
    } catch (error) {
      console.error('Error creating page in Notion:', error);
      res.status(500).json({ error: 'Error creating page in Notion' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
