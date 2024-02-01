'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IngressInput } from 'livekit-server-sdk';
import { createIngress } from '@/actions/ingress';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

const RTMP_INPUT = String(IngressInput.RTMP_INPUT);
const WHIP_INPUT = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP_INPUT | typeof WHIP_INPUT;

export function GenerateModal() {
  const [isClient, setIsClient] = useState(false);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP_INPUT);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('Credentials generated.');
        })
        .catch(() => toast.error('Something went wrong. Try again later'));
    });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <Button variant="primary" disabled>
        Generate
      </Button>
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button disabled={isPending} variant="primary">
          Generate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate new credentials?</AlertDialogTitle>
          <Select
            value={ingressType}
            onValueChange={(value) => setIngressType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RTMP_INPUT}>RTMP</SelectItem>
              <SelectItem value={WHIP_INPUT}>WHIP</SelectItem>
            </SelectContent>
          </Select>
          <AlertDialogDescription>
            This action will reset all active streams using the current
            credentials.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            disabled={isPending}
            className="bg-indigo-600 hover:bg-indigo-600/80 text-primary"
          >
            Generate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
