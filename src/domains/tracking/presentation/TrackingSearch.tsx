'use client';

import { useState } from "react";
import Input from "@/design-system/atoms/inputs/Input";
import Button from "@/design-system/atoms/buttons/Button";
import ErrorFormMessage from "@/design-system/atoms/messages/ErrorFormMessage";

const TrackingSearch = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackingSearch = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // TODO: Implement tracking search logic
      console.log("Searching for tracking number:", trackingNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show a success message
      console.log("Tracking found!");
    } catch {
      setError("Failed to find tracking information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
    if (error) setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTrackingSearch();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Track Your Package
        </h1>
        <p className="text-[var(--muted)]">
          Enter your tracking number to locate your shipment
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={!!error}
        />

        <Button
          onClick={handleTrackingSearch}
          loading={isLoading}
          disabled={!trackingNumber.trim()}
        >
          {isLoading ? "Searching..." : "Locate Shipment"}
        </Button>

        <ErrorFormMessage message={error} />
      </div>
    </div>
  );
};

export default TrackingSearch;