import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase';

export const ContactSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !message) {
      toast({ title: 'All fields required', variant: 'destructive' });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.from('support').insert({
      user_id: user?.id || null,
      subject,
      message,
      status: 'pending',
    } as never);

    setLoading(false);

    if (error) {
      toast({ title: 'Failed to submit', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Message sent!', description: 'We will get back to you soon.' });
      setSubject('');
      setMessage('');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-krishi-green-800 to-krishi-green-900">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-krishi-green-50 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-krishi-green-200">{t('contact.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-elevated">
            {user && (
              <div className="mb-4 p-3 bg-primary/10 rounded-lg text-sm text-primary">
                Submitting as: {user.email}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">{t('contact.subject')}</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your query in detail..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {t('contact.send')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
