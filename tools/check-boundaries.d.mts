export declare function checkBoundaries(options?: {
  repoRoot?: string;
}): Promise<{ violations: string[]; checkedFiles: number }>;
