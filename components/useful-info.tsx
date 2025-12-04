'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code2,
  ExternalLink,
  GitBranch,
  HelpCircle,
  Terminal,
  Zap,
} from 'lucide-react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

function InfoCard({ icon, title, description, badge }: InfoCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium">{title}</h4>
            {badge && (
              <Badge variant="secondary" className="text-[10px]">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function UsefulInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Reference</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Command Examples */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Common Commands
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-md bg-muted font-mono text-xs overflow-x-auto">
              <div className="text-muted-foreground mb-1"># Generate storage proof</div>
              <div>node dist/index.cjs --rpc &lt;RPC_URL&gt; --account &lt;CONTRACT&gt; --slot &lt;SLOT&gt; --block &lt;BLOCK&gt;</div>
            </div>
            <div className="p-3 rounded-md bg-muted font-mono text-xs overflow-x-auto">
              <div className="text-muted-foreground mb-1"># Calculate storage slot for mapping</div>
              <div>cast index address &lt;KEY&gt; &lt;SLOT&gt;</div>
            </div>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid sm:grid-cols-2 gap-3">
          <InfoCard
            icon={<Zap className="h-4 w-4" />}
            title="Checkpoint Frequency"
            description="Checkpoints are created approximately every 6 blocks (~1 minute) depending on broadcaster configuration"
            badge="~6 blocks"
          />
          <InfoCard
            icon={<GitBranch className="h-4 w-4" />}
            title="Proof Validity"
            description="Storage proofs are valid for any block >= your transaction block, as long as it's checkpointed"
          />
          <InfoCard
            icon={<Code2 className="h-4 w-4" />}
            title="SignalService Events"
            description="Listen for CheckpointSaved(blockNumber, blockHash, stateRoot) events to track new checkpoints"
          />
          <InfoCard
            icon={<HelpCircle className="h-4 w-4" />}
            title="When to Generate Proof"
            description="Wait until your source block is checkpointed on the target chain, then use the checkpoint block number"
          />
        </div>

        {/* Contract Addresses */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Contract Addresses (Internal Testnet)
          </h3>
          <div className="grid gap-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-muted/50">
              <span className="text-muted-foreground">L1 SignalService</span>
              <code className="font-mono">0xbB128Fd4942e8143B8dc10f38CCfeADb32544264</code>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-muted/50">
              <span className="text-muted-foreground">L2 SignalService</span>
              <code className="font-mono">0x1670010000000000000000000000000000000005</code>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-muted/50">
              <span className="text-muted-foreground">Broadcaster</span>
              <code className="font-mono">0x6BdBb69660E6849b98e8C524d266a0005D3655F7</code>
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div>
          <h3 className="text-sm font-medium mb-3">Cross-Chain Verification Workflow</h3>
          <div className="space-y-2">
            {[
              'Send transaction on source chain (L1 or L2)',
              'Wait for transaction to be included in a block',
              'Check this dashboard to see when block is checkpointed',
              'Generate storage proof using the checkpointed block',
              'Submit proof to target chain for verification',
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <a
            href="https://docs.taiko.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Taiko Docs
          </a>
          <span className="text-muted-foreground/50">|</span>
          <a
            href="https://github.com/taikoxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            GitHub
          </a>
          <span className="text-muted-foreground/50">|</span>
          <a
            href="https://l1explorer.internal.taiko.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            L1 Explorer
          </a>
          <span className="text-muted-foreground/50">|</span>
          <a
            href="https://blockscout.internal.taiko.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            L2 Explorer
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
