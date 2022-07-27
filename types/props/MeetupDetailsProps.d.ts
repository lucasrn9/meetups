export interface MeetupDetailsProps {
  meetups:
    | [
        {
          city: string;
          description: string;
          image_url: string;
          number: string;
          street: string;
          title: string;
          error?: string;
        }
      ]
    | [
        {
          city?: string;
          description?: string;
          image_url?: string;
          number?: string;
          street?: string;
          title?: string;
          error: string;
        }
      ];
}
