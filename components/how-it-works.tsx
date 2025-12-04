'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Box, CheckCircle2, Clock, FileCode, Shield } from 'lucide-react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [animatedBlock, setAnimatedBlock] = useState(0);

  // Animate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate blocks
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBlock((prev) => (prev + 1) % 6);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: 'Blocks Created',
      description: 'New blocks are produced on L1 and L2 chains continuously',
      icon: Box,
    },
    {
      title: 'Broadcaster Monitors',
      description: 'The broadcaster watches for new blocks and periodically creates checkpoints',
      icon: Clock,
    },
    {
      title: 'Checkpoint Saved',
      description: 'Block hash and state root are saved to SignalService on the target chain',
      icon: CheckCircle2,
    },
    {
      title: 'Proof Ready',
      description: 'Once checkpointed, storage proofs can be generated and verified cross-chain',
      icon: Shield,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          How Cross-Chain Checkpointing Works
          <Badge variant="secondary" className="text-xs">Live Animation</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Animated Chain Visualization */}
        <div className="relative bg-muted/30 rounded-lg p-6 overflow-hidden">
          {/* L1 Chain */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-20 text-sm font-medium text-right">L1 Chain</div>
            <div className="flex-1 flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`l1-${i}`}
                  className={`
                    h-10 w-12 rounded border-2 flex items-center justify-center text-xs font-mono
                    transition-all duration-300
                    ${i <= animatedBlock
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                    }
                    ${i === animatedBlock ? 'scale-110 shadow-lg' : ''}
                  `}
                >
                  {1520 + i}
                </div>
              ))}
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />
            </div>
          </div>

          {/* Checkpoint Arrow Animation */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-20" />
            <div className="flex-1 relative h-16">
              {/* L1 to L2 arrow */}
              <div
                className={`
                  absolute left-[72px] top-0 flex flex-col items-center
                  transition-opacity duration-500
                  ${activeStep === 2 ? 'opacity-100' : 'opacity-30'}
                `}
              >
                <div className="w-0.5 h-6 bg-green-500" />
                <div className="text-[10px] text-green-500 font-medium whitespace-nowrap">
                  Checkpoint
                </div>
                <div className="w-0.5 h-6 bg-green-500" />
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500" />
              </div>

              {/* Broadcaster label */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge
                  variant="outline"
                  className={`
                    transition-all duration-300
                    ${activeStep === 1 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-600 dark:text-yellow-400' : ''}
                  `}
                >
                  <FileCode className="h-3 w-3 mr-1" />
                  Broadcaster
                </Badge>
              </div>
            </div>
          </div>

          {/* L2 Chain */}
          <div className="flex items-center gap-2">
            <div className="w-20 text-sm font-medium text-right">L2 Chain</div>
            <div className="flex-1 flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`l2-${i}`}
                  className={`
                    h-10 w-12 rounded border-2 flex items-center justify-center text-xs font-mono
                    transition-all duration-300
                    ${i <= animatedBlock
                      ? 'bg-blue-500/20 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                    }
                    ${i === animatedBlock ? 'scale-110 shadow-lg' : ''}
                  `}
                >
                  {200 + i}
                </div>
              ))}
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />
            </div>
          </div>

          {/* Checkpoint indicator on L2 */}
          <div
            className={`
              absolute left-[152px] bottom-[52px]
              transition-all duration-500
              ${activeStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
          >
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`
                  p-3 rounded-lg border transition-all duration-300
                  ${activeStep === index
                    ? 'bg-primary/10 border-primary shadow-sm'
                    : 'bg-muted/30 border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${activeStep === index ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs font-medium ${activeStep === index ? 'text-primary' : 'text-muted-foreground'}`}>
                    Step {index + 1}
                  </span>
                </div>
                <p className={`text-sm font-medium ${activeStep === index ? '' : 'text-muted-foreground'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Concepts */}
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              SignalService
            </h4>
            <p className="text-xs text-muted-foreground">
              Smart contract that stores checkpoints (block hash + state root) for cross-chain verification
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Checkpoint
            </h4>
            <p className="text-xs text-muted-foreground">
              A snapshot containing block number, block hash, and state root that enables proof verification
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Storage Proof
            </h4>
            <p className="text-xs text-muted-foreground">
              Cryptographic proof that a value exists in contract storage at a checkpointed block
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
