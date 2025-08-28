import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Workshop } from "@shared/schema";

interface BookingDialogProps {
  workshop: Workshop;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bookingSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  userEmail: z.string().email("Please enter a valid email"),
  userPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function BookingDialog({ workshop, open, onOpenChange }: BookingDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPhone: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const response = await apiRequest("POST", "/api/bookings", {
        ...data,
        workshopId: workshop.id,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops"] });
      toast({
        title: "Booking Confirmed!",
        description: "Your workshop booking has been confirmed. You'll receive a confirmation email shortly.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Unable to complete booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    try {
      await bookingMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid={`booking-dialog-${workshop.id}`}>
        <DialogHeader>
          <DialogTitle>Book Workshop</DialogTitle>
          <DialogDescription>
            Reserve your spot for "{workshop.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-foreground mb-2">{workshop.title}</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{formatDate(workshop.date)} at {workshop.time}</p>
            <p>Duration: {workshop.duration}</p>
            <p>Price: ₹{workshop.price}</p>
            <p>Instructor: {workshop.instructor}</p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="userName">Full Name</Label>
            <Input
              id="userName"
              placeholder="Enter your full name"
              {...form.register("userName")}
              data-testid="input-user-name"
            />
            {form.formState.errors.userName && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.userName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="userEmail">Email Address</Label>
            <Input
              id="userEmail"
              type="email"
              placeholder="Enter your email"
              {...form.register("userEmail")}
              data-testid="input-user-email"
            />
            {form.formState.errors.userEmail && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.userEmail.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="userPhone">Phone Number</Label>
            <Input
              id="userPhone"
              type="tel"
              placeholder="Enter your phone number"
              {...form.register("userPhone")}
              data-testid="input-user-phone"
            />
            {form.formState.errors.userPhone && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.userPhone.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              data-testid="button-cancel-booking"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-confirm-booking"
            >
              {isSubmitting ? "Booking..." : `Confirm Booking (₹${workshop.price})`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
